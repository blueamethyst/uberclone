import nodemailer from 'nodemailer';


const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER_ID,
        pass: process.env.MAIL_USER_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

class Mailer {
    /**
     * sendEmail
     */
    public async sendEmail(from: string, to: string, subject: string, html: string): Promise<{ ok: boolean, message: string }> {
        try {
            let info = await transport.sendMail({ from, subject, to, html });

            console.log('Message sent successfully!');
            console.log(nodemailer.getTestMessageUrl(info));

            return { ok: true, message: info.response };
        } catch (err) {
            console.log(`error: ${err}`);
            return { ok: false, message: err };
        }

    }


    public async sendVirificationEmail(to: string, fullName: string, key: string): Promise<{ ok: boolean, message: string }> {
        const emailSubject = `Hello~ ${fullName}, please verify your email`;
        const emailBody = `Verify your email by clicking <a href="http://${process.env.HOST_NAME}:${process.env.PORT}/verification/${key}/">here</a>`;

        const from = process.env.MAIL_USER_ID + "";

        try {
            let result = await this.sendEmail(from, to, emailSubject, emailBody);
            console.log('verification mail sending result : ' + result.message.toString());

            return result;
        } catch (err) {
            return { ok: false, message: err };
        }
    }

}



export default Mailer;