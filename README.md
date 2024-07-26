# Logic Gate Simulator

## Overview

This application is a simple logic gate simulator built with React and Rust. It allows users to create and manipulate logic gates (AND, OR, XOR) on an interactive canvas. The primary goal of this project is to learn and practice React and Rust, and it is not intended for commercial use. Feel free to use this project to get inspired or to practice your own coding skills.

## Technologies Used

- **React**: For building the user interface and handling state management.
- **Rust**: To provide efficient backend logic.
- **@xyflow/react**: For creating and managing the interactive canvas with nodes and edges.
- **HTML & CSS**: For structuring and styling the application.

## Features

- **Interactive Canvas**: Add, move, connect, and delete logic gates on a canvas.
- **Logic Gates**: Includes AND, OR, and XOR gates, each with multiple inputs and a single output.
- **State Management**: Handles the state of nodes and edges, updating the output based on the inputs.
- **Save and Load Diagrams**: Save your current diagram and load it later to continue working.

## Node Types

1. **Input Node**: Provides a binary input (0 or 1).
2. **AND Gate**: Outputs 1 if both inputs are 1, otherwise outputs 0.
3. **OR Gate**: Outputs 1 if at least one input is 1, otherwise outputs 0.
4. **XOR Gate**: Outputs 1 if exactly one input is 1, otherwise outputs 0.
5. **Output Node**: Displays the result of the connected logic gate.

## Usage

1. **Add Nodes**: Use the buttons in the control panel to add different types of nodes to the canvas. The nodes will appear at the center of the canvas.
2. **Connect Nodes**: Drag from the output handle of one node to the input handle of another to create a connection.
3. **Move Nodes**: Click and drag a node to move it around the canvas.
4. **Delete Nodes/Edges**: Right-click on a node or edge and select delete to remove it.
5. **Save Diagram**: Click the 'Save' button to save your current diagram.
6. **Load Diagram**: Click the 'Load' button to load a previously saved diagram.

## Inspiration

This application was inspired by my friend who is into electronics. It serves as a learning tool for both React and Rust, providing a hands-on approach to understanding how logic gates work.

## Disclaimer

This application is not intended for commercial use. It is a simple project designed for learning purposes. Feel free to use it to get inspired or practice your own coding skills.

## License

This project is open source and available under the MIT License.

By QuimeraGH 2024.