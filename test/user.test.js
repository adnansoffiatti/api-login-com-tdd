let app = require("../src/app");
let supertest = require("supertest");
let request = supertest(app);

describe("Cadastro de usuário", () => {
    test("Deve cadastrar um usuário com sucesso", () => {
        let time = Date.now();
        let email = `${time}@gmail.com`;
        let user = {name: "Adnan", email, password: "123456"};

        return request.post("/user")
            .send(user)
            .then(res => {

                expect(res.statusCode).toEqual(200);
                expect(res.body.email).toEqual(email);

            }).catch(error => {
                fail(error)
            });
    })
});