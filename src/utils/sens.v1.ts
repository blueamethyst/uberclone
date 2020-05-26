import axios from 'axios';

type SENS_RESPONSE_TYPE = {
    requestId?: string,
    requestTime?: string,
    statusCode: string,
    statusName?: string
}

class SensManager {
    //const { SENS_AUTH_KEY: SNES_AUTH_KEY, ['X-NCP-service-secret']: SNES_SERVICE_SECRET_KEY, serviceId } = process.env;

    private serviceId: string = process.env.SNES_SERVICE_ID || "";
    private authKey: string = process.env.SNES_AUTH_KEY || "";
    private secretKey: string = process.env.SNES_SERVICE_SECRET_KEY || "";

    /**
     * SendSms
     */
    public async SendSms(from: string, to: string[], content: string): Promise<SENS_RESPONSE_TYPE> {
        const message = {
            type: "sms",
            from,
            to, // array
            content
        };

        const url = `https://api-sens.ncloud.com/v1/sms/services/${encodeURI(this.serviceId)}/messages`;

        console.log("target url : " + url);
        await axios({
            method: 'POST',
            url: url,
            headers: {
                'X-NCP-auth-key': this.authKey,
                'X-NCP-service-secret': this.secretKey
            },
            data: message
        })
            .then(res => {
                console.log("SendSMS Success: " + res);
                return res;
            })
            .catch(err => {
                console.log("SendSMS Fail : " + err);
                return err;
            }) // end axios Promise


        return {
            "statusCode": "500",
            "statusName": "error"
        };
    }




}

export default SensManager;