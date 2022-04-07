import api from "./api";

interface LoginResponse {
    token: string;
    user: {
        id: string,
        group: {
            id: string,
            name: string,
            created_at: string,
            updated_at: string
        },
        firstname: string,
        lastname: string,
        email: string,
        photo: string,
        phone: string,
        created_at: string,
        updated_at: string
    }
}

interface RegisterResponse {
    id: string,
    group: {
        id: string,
        name: string,
        created_at: string,
        updated_at: string
    },
    firstname: string,
    lastname: string,
    email: string,
    photo: string,
    phone: string,
    created_at: string,
    updated_at: string
}

interface SignInProps {
    email: string,
    password: string
}

interface RegisterProps {
    group_name: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    password_confirmation: string,
    phone: string
}

export async function signIn(user: SignInProps | null): Promise<LoginResponse> {

    const response = await api.post('/user/login', { ...user });
        
    return {
        user: response.data.data.user,
        token: response.data.data.token
    }
    
}

export async function register(user: RegisterProps | null): Promise<RegisterResponse> {
    const request = await api.post('/user/register', { ...user });

    return {
        ...request.data.data
    }
}

export async function forgotPassword(email: string): Promise<void> {
    await api.post('/user/forgot-password', { email });
}