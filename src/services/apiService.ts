export const api = {
    saveToken: (token: string) => {
        try {
            localStorage.setItem('authToken', token);
            console.log('Token saved to local storage.');
        } catch (e) {
            console.error('Could not save token to local storage', e);
        }
    },
    logout: () => {
        try {
            localStorage.removeItem('authToken');
            console.log('Token removed from local storage.');
        } catch (e) {
            console.error('Could not remove token from local storage', e);
        }
    },
    login: async (email: string, password: string): Promise<any> => {
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email: email.trim().toLowerCase(), 
                    password: password.trim(), 
                }),
            });

            // const data = await response.json();
            const text = await response.text();
                console.log("Raw signup response:", text);
                const data = text ? JSON.parse(text) : {};
            if (response.ok && data.data) {
                api.saveToken(data.data); //stores JWT
            }

            return { ok: response.ok, data };
        } catch (error) {
            console.error('Login API call failed:', error);
            return { ok: false, data: { error: 'An unexpected error occurred.' } };
        }
    },
    signUp: async (name: string, email: string, password: string): Promise<any> => {
        try {
            const response = await fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: name, email, password }),
            });

            // const data = await response.json();
            const text = await response.text();
                console.log("Raw signup response:", text);
                const data = text ? JSON.parse(text) : {};
            if (response.ok && data.token) {
                api.saveToken(data.token);
            }
            return { ok: response.ok, data };
        } catch (error) {
            console.error('Sign-up API call failed:', error);
            return { ok: false, data: { error: 'An unexpected error occurred.' } };
        }
    },
};

