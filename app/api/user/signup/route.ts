import { connect } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { email, password } = reqBody;

        // Check if user exists
        const user = await User.findOne({ email });
        if (user) {
            return NextResponse.json(
                { message: "User already exists",
                    
                 },{
                    status:400
                 }
             

            );
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            email,
            password: hashPassword // Store the hashed password
        });

        const savedUser = await newUser.save();
        console.log(savedUser)

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 200 }
        );
    } catch (error:any) {
        console.error("Error:", error); // Log the error for debugging
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
