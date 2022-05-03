import 'bootstrap/dist/css/bootstrap.css'
import axios from 'axios';

const LandingPage =({currentUser})=>{
    console.log("current", currentUser);
    return(
        <h1>Hi teher!   </h1>
    )
}

LandingPage.getInitialProps = async ({req})=>{
    if(typeof window === 'undefined'){
        const response = await axios.get(
            "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
            {
                headers:req.headers
            }
        );
        console.log(response.data);
        return {currentUser: response.data};
    }else{
        const response = await axios.get("/api/users/currentuser");
        return {currentUser:response.data};
    }
    return {}
}

export default LandingPage;