"use strict";
const names = [];
const promise = new Promise((resolve, reject) => {
    let error = false;
    setTimeout(() => {
        resolve("This promise has resolved");
    }, 2000);
    if (error) {
        reject("This promise has rejected.");
    }
});
promise.then((data) => data.split(" "));
const merge = (objA, objB) => {
    return Object.assign(objA, objB);
};
const mergedObj = merge({ name: "Steven", hobbies: ["Drums"] }, { age: 32 });
console.log(mergedObj.name);
const countAndDescribe = (element) => {
    let description = "Got no value.";
    if (element.length === 1) {
        description = `Got 1 element.`;
    }
    else if (element.length > 1) {
        description = `Got ${element.length} elements.`;
    }
    return [element, description];
};
console.log(countAndDescribe("Stringyyyy"));
const extractAndConvert = (obj, key) => {
    console.log(`Value: ${obj[key]}`);
};
extractAndConvert({ age: 100 }, "age");
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (!this.data.indexOf(item)) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return this.data;
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Steven");
textStorage.addItem("James");
textStorage.addItem("Joel");
textStorage.removeItem("Steven");
const allTextItems = textStorage.getItems();
console.log(allTextItems);
const numberStorage = new DataStorage();
const createCourseGoal = (title, description, date) => {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeDate = date;
    return courseGoal;
};
const drummers = ["Vinnie", "Steve"];
