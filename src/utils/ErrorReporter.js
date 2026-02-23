class ErrorReporter {
    constructor() {
        this.listeners = new Set();
        if (typeof window !== 'undefined') {
            window.addEventListener('error', (event) => {
                this.report(event.error || event.message);
            });
            window.addEventListener('unhandledrejection', (event) => {
                this.report(event.reason);
            });
        }
    }

    report(error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("[ErrorReporter]", error);
        this.notify(errorMessage);
    }

    subscribe(callback) {
        this.listeners.add(callback);
        return () => this.listeners.delete(callback);
    }

    notify(message) {
        this.listeners.forEach(callback => callback(message));
    }
}

export const errorReporter = new ErrorReporter();
