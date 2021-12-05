import get from "superagent";
import put from "superagent";
import del from "superagent";
import ajax from "superagent";
import StatusCodes from "http-status-codes";
import * as chai from "chai";

const expect = chai.expect;

describe("Customer tests", () => {
  let customerTestId;
  let customerName;
  it("Create customer", async () => {
    const response = await ajax
      .post("http://localhost:8080/api/customer/")
      .send({
        customerId: 1,
        name: "Sally Vallery",
        address: "144 Townsend, San Francisco 99999",
        email: "sally@example.com",
        phone: "513 222 5555",
        username: "sallyv",
        password: "sallypassword",
        enabled: "true",
        role: "USER",
      })
      .set("Content-type", "application/json")
      .set("Accept", "application/json");

    expect(response.status).to.equal(StatusCodes.CREATED);
    expect(response.body).to.have.property("customerId");
    customerTestId = response.body.customerId; ///User Id
    customerName = response.body.name; ///User Name
  });

  it("Get customer by Id", async () => {
    const id = customerTestId;
    const response = await get("http://localhost:8080/api/customer/" + id)
      .set("Content-type", "application/json")
      .set("Accept", "application/json");
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body).to.have.property("customerIf"); //this is misspelled in the API
    expect(response.body).to.have.property("name");
    expect(response.body).to.have.property("username");
  });

  it("Get customer by name", async () => {
    it("A costumer must be show", async () => {
      const response = await get(
        "http://localhost:8080/api/customer/username=" + customerName
      )
        .set("User-Agent", "agent") /// borrar maybe(?)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json");
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.have.property("name");
      expect(response.body.name).to.equal(customerName);
    });
  });

  it("Get Customer by Username", async () => {
    const username = "sallyv"; /////Username
    const response = await get(
      "http://localhost:8080/api/customer/username=" + username
    )
      .set("Content-type", "application/json")
      .set("Accept", "application/json");
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.body).to.have.property("username");
    expect(response.body).to.have.property("customerIf");
  });

  it("Update customer", async () => {
    it("The correct costumer should be update", async () => {
      const customer = {
        customerId: customerTestId,
        name: "Sally Vallery",
        address: "Arcane street",
        email: "jinxed@XD.com",
        phone: "32467991632",
        username: "definitelynotjinx",
        password: "wtfjinx",
        enabled: "true",
        role: "USER",
      };

      const response = await put(
        "http://localhost:8080/api/customer/" + customerTestId
      )
        .set("Content-type", "application/json")
        .set("Accept", "application/json")
        .send(customer);
      expect(response.status).to.equal(StatusCodes.OK);
      expect(response.body).to.have.property("customerId");
      expect(response.body.address).to.equal(customer.address);
      expect(response.body.address).to.equal(customer.email);
      expect(response.body.phone).to.equal(customer.phone);
      expect(response.body.address).to.equal(customer.username);
      expect(response.body.password).to.equal(customer.password);
    });
  });

  it("Delete customer by Id", async () => {
    const id = customerTestId; // Deberiamos cambiar esto
    const response = await ajax
      .del("http://localhost:8080/api/customer/" + id) ///Por que no sirve del (?)
      .set("Content-type", "application/json")
      .set("Accept", "application/json");
    expect(response.status).to.equal(StatusCodes.NO_CONTENT);
  });

  it("Delete all customers in system", async () => {
    const response = await ajax
      .del(`http://localhost:8080/api/customer/`)
      .set("User-Agent", "agent")
      .set("Content-Type", "application/json");
    expect(response.status).to.equal(StatusCodes.NO_CONTENT);
  });
});
