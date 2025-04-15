import { isAdmin } from "@/app/api/utils";

export async function GET(){
    return new Response(JSON.stringify({is_admin: isAdmin()}))
}