import { databaseConnection, executeQuery, getLoggedInUsername } from "../utils"

class Notification {

    constructor(connection) {
        this.connection = connection;
    }

    async save(to_user, caused_by_user, event, subject) {

        const query = `INSERT INTO notifications (to_user, caused_by_user, event, subject) 
                     VALUES ('${to_user}', '${caused_by_user}', '${event}', '${subject}')`;
        
        const result = await executeQuery(this.connection, query)

        return result
        
    }

    // Static method: Mark all notifications as read for a specific user
    static async markAllAsRead(connection, to_user) {
        const query = `UPDATE notifications SET is_read = 1 WHERE to_user = '${to_user}' `;
        const result = await executeQuery(connection, query)
        return result
    }

    // Static method: Mark all notifications as read for a specific user
    static async getAllNotifications(connection, to_user) {
        const query = `SELECT * from notifications  WHERE to_user = '${to_user}' ORDER BY id DESC  LIMIT 10 `;
        const result = await executeQuery(connection, query)
        return result
    }
    

}

export default Notification