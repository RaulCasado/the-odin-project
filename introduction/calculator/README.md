# Calculator

A simple calculator application built with HTML, CSS, and JavaScript.

## Overview

This project implements a basic calculator supporting addition, subtraction, multiplication, and division. The user can interact with the calculator either by clicking on the on-screen buttons or using keyboard input.

## Features

- Basic arithmetic operations: +, -, *, /
- Decimal support and backspace functionality
- Responsive design with clear and equals functionality

## Usage

1. Open the `index.html` file in your browser.
2. Use the on-screen buttons or your keyboard to perform calculations.

## Files

- `index.html`: Contains the calculator layout.
- `style.css`: Provides styling for the calculator.
- `script.js`: Contains the application logic for operations.

## Why Avoid Using eval()?

Using eval() can lead to serious security vulnerabilities as it executes arbitrary code, potentially exposing your application to code injection attacks. This project avoids eval() by explicitly parsing inputs and handling operations with dedicated functions.

## License

Project done for the purpose of learning JavaScript and DOM manipulation. Feel free to use the code as you wish! Special thanks to [The Odin Project](https://www.theodinproject.com/) for the project idea.
