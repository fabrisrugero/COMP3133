// test/server.js

var expect = require("chai").expect;
var calculator = require("../app/calculator");

describe("Test Calculator", () => {
  describe("Test Addition", () => {
    it("add(5, 2) expected result 7 PASS", (done) => {
      expect(calculator.add(5, 2)).to.equal(7);
      done();
    });
    it("add(5, 2) expected result 8 Fail", (done) => {
      expect(calculator.add(5, 2)).to.equal(8);
      done();
    });
  });
  describe("Test Substraction", () => {
    it("sub(5, 2) expected result 3 PASS", (done) => {
      expect(calculator.sub(5, 2)).to.equal(3);
      done();
    });

    it("sub(5, 2) expected result 2 FAIL", (done) => {
      expect(calculator.sub(5, 2)).to.equal(2);
      done();
    });
  });
  describe("Test Multiplication", () => {
    it("mul(5, 2) expected result 10 PASS", (done) => {
      expect(calculator.mul(5, 2)).to.equal(10);
      done();
    });

    it("mul(5, 2) expected result 11 FAIL", (done) => {
      expect(calculator.mul(5, 2)).to.equal(11);
      done();
    });
  });
  describe("Test Division", () => {
    it("div(10, 2) expected result 5 PASS", (done) => {
      expect(calculator.div(10, 2)).to.equal(5);
      done();
    });

    it("div(5, 2) expected result 4 FAIL", (done) => {
      expect(calculator.div(10, 2)).to.equal(4);
      done();
    });
  });
});
