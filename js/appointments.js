// Gestion des rendez-vous
class AppointmentManager {
    constructor() {
        this.appointmentsCollection = db.collection('appointments');
        this.form = document.querySelector('#appointment-form');
        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = {
            name: this.form.querySelector('#name').value,
            phone: this.form.querySelector('#phone').value,
            email: this.form.querySelector('#email').value,
            date: this.form.querySelector('#datetime').value,
            message: this.form.querySelector('#message').value,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        try {
            // Sauvegarder le rendez-vous
            await this.appointmentsCollection.add(formData);
            
            // Envoyer un email de confirmation (à implémenter avec Firebase Cloud Functions)
            await this.sendConfirmationEmail(formData);
            
            // Afficher un message de succès
            this.showNotification('Rendez-vous enregistré avec succès !', 'success');
            
            // Réinitialiser le formulaire
            this.form.reset();
        } catch (error) {
            console.error('Erreur lors de l\'enregistrement du rendez-vous:', error);
            this.showNotification('Erreur lors de l\'enregistrement du rendez-vous', 'error');
        }
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Supprimer la notification après 3 secondes
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    async sendConfirmationEmail(appointmentData) {
        // Cette fonction sera implémentée avec Firebase Cloud Functions
        // pour envoyer un email de confirmation au patient
        console.log('Envoi d\'un email de confirmation à:', appointmentData.email);
    }

    // Méthode pour récupérer les rendez-vous d'un patient
    async getPatientAppointments(email) {
        try {
            const snapshot = await this.appointmentsCollection
                .where('email', '==', email)
                .orderBy('date', 'desc')
                .get();

            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Erreur lors de la récupération des rendez-vous:', error);
            throw error;
        }
    }

    // Méthode pour annuler un rendez-vous
    async cancelAppointment(appointmentId) {
        try {
            await this.appointmentsCollection.doc(appointmentId).update({
                status: 'cancelled',
                cancelledAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            this.showNotification('Rendez-vous annulé avec succès', 'success');
        } catch (error) {
            console.error('Erreur lors de l\'annulation du rendez-vous:', error);
            this.showNotification('Erreur lors de l\'annulation du rendez-vous', 'error');
        }
    }
}

// Initialiser le gestionnaire de rendez-vous
const appointmentManager = new AppointmentManager(); 