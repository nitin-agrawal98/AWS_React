import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOKEN } from '../constants/localstorage';
import { login } from '../services/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const user = await login(email, password);
            localStorage.setItem(TOKEN, user.getIdToken().getJwtToken());
            navigate('/');
        } catch (error) {
            console.log('error signing in', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            <p>Don't have an account?<a href='/signup'>Click here</a></p>
        </form>
    );
};

export default Login;
