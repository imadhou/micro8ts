import request from 'supertest';
import {app} from '../../app';


it('returns 201 on successful sigup', async()=>{
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.test",
        password: "password"
    })
    .expect(201);
});

it('return 400 with Invalid email', async()=>{
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test",
        password: "password"
    })
    .expect(400);
});

it('return 400 with Invalid password', async()=>{
    return request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test",
        password: "556"
    })
    .expect(400);
});

it('return 400 with missing email and password', async()=>{
    await request(app)
    .post("/api/users/signup")
    .send({
        password: "556"
    })
    .expect(400);

    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test"
    })
    .expect(400);
});

it('return 400 with duplicate email', async()=>{
    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.test",
        password: "55556"
    })
    .expect(201);

    await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.test",
        password: "55556"   
    })
    .expect(500);
});

it('sets cookie on succesful signup', async()=>{
    const response = await request(app)
    .post("/api/users/signup")
    .send({
        email: "test@test.test",
        password: "55556"
    })
    .expect(201);

    expect(response.get("Set-Cookie")).toBeDefined();
})