import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email })
        //check user exist or not

        if (!user) {
            return NextResponse.json(
                { message: "user does not exist" },
                { status: 400 })
        }

        //check password
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { message: "wrong password" },
                { status: 400 }

            )
        }

        //create jwt
        const tokenData = {
            id: user._id,
            email : user.email
        }
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRETE!,{expiresIn:"5m"});

        const response = NextResponse.json(
            {message:"Loging Success"},
            {status:200}
        )
        response.cookies.set("token",token,{
            httpOnly:true
        })
        return response;








    } catch (error:any) {
        return NextResponse.json(
            {error:error.message},
            {status:500}
        )

    }


}