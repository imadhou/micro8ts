import request from 'supertest';
import {app} from '../../app';


it('current user test', async()=>{
    const req = await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.test",
        password: "password"
    })
    .expect(201);

    const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", req.get("Set-Cookie"))
    .send()
    .expect(200);    

    console.log(response.body);
    
}); 