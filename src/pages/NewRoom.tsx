// Forma de utilizar uma imagem na aplicação React
import { Link, useHistory } from 'react-router-dom'
import { FormEvent } from 'react'

import illustrationImg from '../assets/images/Illustration.png'
import logoImg from '../assets/images/Logo.png'
 
import '../styles/auth.css'
import '../styles/button.css'
import '../styles/newRoom.css'

import { Button } from  '../components/Button'
import { useState } from 'react'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'

export function NewRoom() {
    const history = useHistory()
    const {user} = useAuth()
    const [newRoom, setNewRoom] = useState('')
    
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if(newRoom.trim() === '') {
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/room/${firebaseRoom.key}`)
    }

    return (
        <div id="content">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <div className="text">
                    <strong>Crie salas de Q&amp;A ao-vivo</strong>
                    <p>Tire as duvidas de sua audiencia em tempo real</p>
                </div>
            </aside>

            <main>
                <div id="content-main">
                    <img id="logo" src={logoImg} alt="Letmeask" />
                    
                    <h2>Criar uma nova sala</h2>
                    
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala" 
                            onChange={event => setNewRoom(event.target.value)} 
                            value={newRoom}
                        />

                        <Button type="submit" className="buttonPurple">
                            Criar na sala
                        </Button>
                    </form>

                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}