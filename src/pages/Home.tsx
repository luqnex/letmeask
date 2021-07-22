// Forma de utilizar uma imagem na aplicação React
import { useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/Illustration.png'
import logoImg from '../assets/images/Logo.png'
import googleIconImg from '../assets/images/Icon-google.svg'
import logIn from '../assets/images/log-in.png'

import '../styles/auth.css'
import '../styles/button.css'

import { Button } from  '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'

export function Home() {
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()
    const [roomCode, setRoomCode] = useState('')

    async function handleCreateRoom() {
        if(!user) {
            await signInWithGoogle()
        }
        
        history.push('/room/new')
    }

    async function handleJoinRoom(event :FormEvent) {
        event.preventDefault()
        
        if(roomCode.trim() === '') {
            return
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()

        if(!roomRef.exists()) {
            alert('Room does not exists')
            return
        }

        history.push(`room/${roomCode}`)
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
                    <button onClick={handleCreateRoom} className="buttonRed">
                        <img src={googleIconImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>
                    
                    <div id="text">
                       
                        <p>ou entre em uma sala</p>
                       
                    </div>
                    
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" 
                            placeholder="Digite o código da sala" 
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit" className="buttonPurple">
                            <img src={logIn} alt="Login" />
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}