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
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok && data.token) {
                api.saveToken(data.token);
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
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
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

