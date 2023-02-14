import React, { useEffect } from "react";
import Sidebar from "../../components/sidebar/sidebar";
import "./Dashboard.css"
import { decodeToken } from "react-jwt";
import {useNavigate} from "react-router-dom";


export default function AdminDashboard() {
    const navigate = useNavigate();
    useEffect(()=>{
        TokenCheck();
    })

    const TokenCheck = () => {

        const storeToken = localStorage.getItem("token");
        if (storeToken === null || "") {
            localStorage.clear();
            console.log("login redirect")
            loginRedirection();
        } else {
            const { exp } = decodeToken(storeToken);
            const expirationTime = exp * 1000 - 60000;
            if (Date.now() >= expirationTime) {
                localStorage.clear();
                loginRedirection();
            }
        }

    }
    function loginRedirection() {
        console.log("redirection done")
        navigate('/admin-login')
    }
    return (
        <>
            <Sidebar>
                <h1>Dashboard</h1>
                <p className="ContentClass">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed lectus vestibulum mattis ullamcorper. Nulla aliquet porttitor lacus luctus accumsan tortor posuere ac ut. Posuere urna nec tincidunt praesent. Erat pellentesque adipiscing commodo elit at imperdiet dui. Et tortor consequat id porta nibh venenatis. Vulputate mi sit amet mauris commodo. Faucibus vitae aliquet nec ullamcorper sit amet risus nullam. Adipiscing enim eu turpis egestas pretium aenean pharetra. Accumsan sit amet nulla facilisi morbi tempus. Odio aenean sed adipiscing diam donec. In ornare quam viverra orci sagittis eu volutpat odio. Morbi tristique senectus et netus et. Massa sed elementum tempus egestas sed sed risus pretium. Nulla aliquet enim tortor at auctor urna. Et netus et malesuada fames ac turpis.

Feugiat in ante metus dictum at tempor commodo ullamcorper a. Sagittis orci a scelerisque purus. Facilisis gravida neque convallis a cras semper auctor neque. Posuere morbi leo urna molestie at elementum eu facilisis sed. Ultrices neque ornare aenean euismod elementum nisi. Vestibulum mattis ullamcorper velit sed. Eu non diam phasellus vestibulum lorem sed risus ultricies. Volutpat lacus laoreet non curabitur gravida arcu ac tortor. Arcu bibendum at varius vel pharetra vel. Semper risus in hendrerit gravida rutrum. Quis imperdiet massa tincidunt nunc pulvinar. Vulputate dignissim suspendisse in est ante in nibh mauris cursus. Amet mattis vulputate enim nulla aliquet porttitor lacus luctus accumsan.

Id diam vel quam elementum pulvinar etiam non. Scelerisque in dictum non consectetur a. Et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Nisl purus in mollis nunc. Ac orci phasellus egestas tellus. Nunc mattis enim ut tellus elementum sagittis vitae. Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Ultricies mi eget mauris pharetra et ultrices neque. Velit euismod in pellentesque massa placerat. Vel elit scelerisque mauris pellentesque. Diam maecenas ultricies mi eget mauris pharetra. Risus nullam eget felis eget nunc lobortis. Pretium viverra suspendisse potenti nullam ac tortor. Aenean et tortor at risus viverra adipiscing.

Euismod quis viverra nibh cras pulvinar mattis nunc sed blandit. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Cras ornare arcu dui vivamus arcu felis bibendum ut tristique. Nulla pharetra diam sit amet nisl suscipit adipiscing. Sit amet mattis vulputate enim nulla. Pharetra vel turpis nunc eget lorem dolor sed viverra. Aliquet nibh praesent tristique magna sit. Duis convallis convallis tellus id interdum velit. Eu augue ut lectus arcu. Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada proin. Adipiscing bibendum est ultricies integer quis auctor elit sed vulputate. Mauris a diam maecenas sed enim. Quam elementum pulvinar etiam non quam. Suspendisse in est ante in nibh mauris. Orci ac auctor augue mauris augue neque. Praesent elementum facilisis leo vel fringilla est ullamcorper eget nulla.

Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. Mattis rhoncus urna neque viverra justo nec ultrices dui. Cras fermentum odio eu feugiat. Enim tortor at auctor urna nunc id cursus metus. Mauris pharetra et ultrices neque ornare aenean euismod. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Sed vulputate mi sit amet mauris commodo quis imperdiet massa. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare. Est ullamcorper eget nulla facilisi. Eget arcu dictum varius duis.</p>

            </Sidebar>

        </>
    )
}