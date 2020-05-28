import jwt from 'jsonwebtoken';

const createJWT = (id: number): string => {
    const token = jwt.sign({ id }, process.env.JWT_TOKENS || "");

    return token;
}


export default createJWT;