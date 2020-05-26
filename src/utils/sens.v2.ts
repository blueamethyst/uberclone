import axios from 'axios';
import makeSignature from './naverSignature';


export enum SENS_MSG_TYPE { "SMS", "LMS", "MMS" };
export enum SENS_CONTENT_TYPE { "COMM", "AD" };


type SENS_MESSAGE = {
    type: SENS_MSG_TYPE,
    contentType?: SENS_CONTENT_TYPE,    // default:COMM
    countryCode?: string,               // default:82
    from: string,
    subject?: string,
    content: string,    // sms: max 80byte , lms/mms : max 200byte
    messages: [
        {
            to: string, // except "-"
            subject: string | null,
            content: string | null
        }
    ],
    files?: [
        {
            name: string,
            body: string
        }
    ],
    reserveTime?: string,              //"yyyy-MM-dd HH:mm",
    reserveTimeZone?: string,           // default : Asia/seoul
    scheduleCode?: string
}

type SENS_RESPONSE_TYPE = {
    requestId?: string,
    requestTime?: string,
    statusCode: string,
    statusName?: string
}

class SensManager {
    //const { SENS_AUTH_KEY: ncpAuthKey, ['X-NCP-service-secret']: sensServiceSecret, serviceId } = process.env;

    private serviceId: string = process.env.SNES_SERVICE_ID || "";
    private authKey: string = process.env.SNES_AUTH_KEY || "";

    /**
     * SendSms
     */
    public async SendSms(from: string, to: string, content: string): Promise<SENS_RESPONSE_TYPE> {
        const messages: SENS_MESSAGE = {
            type: SENS_MSG_TYPE.SMS,
            from: from,
            messages: [{ to: to, subject: "", content: content }],
            content: content
        }

        console.log("sendsms message : " + messages);
        console.log("service id : " + this.serviceId);
        console.log("process service id : " + process.env.SNES_SERVICE_ID);

        const url = `https://sens.apigw.ntruss.com/sms/v2/services/${encodeURI(this.serviceId)}/messages`;
        const signature = makeSignature("GET", url);

        console.log("target url : " + url);
        console.log("signature : " + signature);

        await axios({
            method: 'POST',
            url: url,
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "x-ncp-apigw-timestamp": Date.now(),
                "x-ncp-iam-access-key": this.authKey,
                "x-ncp-apigw-signature-v2": signature
            },
            data: messages
        }).then(res => {
            console.log("SendSms success : " + res)
            return res;
        }).catch(err => {
            console.log("SendSms fail : " + err);
            return err;
        })

        return {
            "statusCode": "500",
            "statusName": "error"
        };
    }




}

export default SensManager;