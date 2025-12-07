const request = require("supertest");
const app = require('../../app'); 
const sequelize = require("../config/db.config");
const taskService = require('../services/tasks.service');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Tasks - Integration Tests", () => {

    test("POST /tasks should create a new task", async () => {
        const res = await request(app)
            .post("/api/tasks")
            .send({
                title: "Title 1",
                description: "Description"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.title).toBe("Title 1");
        expect(res.body.isCompleted).toBe(false);
    });

    test("GET /tasks should return latest uncompleted 5 tasks", async () => {
        const res = await request(app).get("/api/tasks");

        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeLessThanOrEqual(5);
        expect(res.body.every(t => t.isCompleted === false)).toBe(true);
    });

    test("PUT /tasks/:id should update isCompleted", async () => {
        const res = await request(app)
            .put("/api/tasks/1")
            .send({ isCompleted: true });

        expect(res.statusCode).toBe(200);
        expect(res.body.isCompleted).toBe(true);
    });

});

describe("Tasks - Unit Tests", () => {

    test("should return latest uncompleted 5 tasks", async () => {
        const result = await taskService.getTasks();

        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeLessThanOrEqual(5);
        expect(result.every(t => t.isCompleted === false)).toBe(true);
    });

    test("should create a new task", async () => {
        const task = { title: "Title 1", description: "Description" };
        const result = await taskService.createTask(task);

        expect(result).toMatchObject({
        title: "Title 1",
        description: "Description",
        isCompleted: false
        });
        expect(result.createdAt).toEqual(expect.any(Date));
        expect(result.updatedAt).toEqual(expect.any(Date));
    });

    test("should mark task as completed", async () => {
        const task = { title: "Title 1", description: "Description" };
        const createdTask = await taskService.createTask(task);

        const result = await taskService.completeTask(createdTask.id);

        expect(result.isCompleted).toBe(true);
    });

});
