export const generateNotificationEmail = (title: string, message: string, ctaLink?: string) => {
    return `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f6f6f6;">
        <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">
            <div style="text-align: center;">
                <img src="https://yourdomain.com/logo.png" alt="MallKet" width="120"/>
            </div>
            <h2 style="color: #333;">${title}</h2>
            <p style="color: #555;">${message}</p>
            ${ctaLink ? `<a href="${ctaLink}" style="display:inline-block; margin-top: 20px; padding: 10px 20px; background-color: #007bff; color:white; text-decoration:none; border-radius: 4px;">View Details</a>` : ''}
            <p style="margin-top: 40px; font-size: 12px; color: #999;">&copy; ${new Date().getFullYear()} MallKet. All rights reserved.</p>
        </div>
    </div>`;
};
