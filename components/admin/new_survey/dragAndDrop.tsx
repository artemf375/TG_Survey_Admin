import React, { useState } from 'react';
import { ChakraProvider, Flex, Box, Text } from '@chakra-ui/react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const GRID_SIZE = 6;
const CELL_SIZE = 50;

const initialItems = [
    { id: 'item1', content: 'Item 1', width: 1, height: 1 },
    { id: 'item2', content: 'Item 2', width: 1, height: 1 },
    { id: 'item3', content: 'Item 3', width: 1, height: 1 },
];

const DragDropGrid = () => {
    const [items, setItems] = useState(initialItems);
    const [grid, setGrid] = useState(Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(null)));

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === 'sidebar' && destination.droppableId.startsWith('grid-')) {
            const item = items[source.index];
            const newGrid = [...grid];
            const [row, col] = destination.droppableId.split('-').slice(1).map(Number);

            if (isValidPlacement(newGrid, row, col, item.width, item.height)) {
                placeItemOnGrid(newGrid, row, col, item);
                setGrid(newGrid);
                setItems(items.filter((_, index) => index !== source.index));
            }
        }
    };

    const isValidPlacement = (grid, row, col, width, height) => {
        if (row + height > GRID_SIZE || col + width > GRID_SIZE) return false;

        for (let i = row; i < row + height; i++) {
            for (let j = col; j < col + width; j++) {
                if (grid[i][j] !== null) return false;
            }
        }

        return true;
    };

    const placeItemOnGrid = (grid, row, col, item) => {
        for (let i = row; i < row + item.height; i++) {
            for (let j = col; j < col + item.width; j++) {
                grid[i][j] = item.id;
            }
        }
    };

    return (
        <ChakraProvider>
            <DragDropContext onDragEnd={onDragEnd}>
                <Flex>
                    <Droppable droppableId="sidebar">
                        {(provided) => (
                            <Box
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                w="55px"
                                bg="gray.500"
                                p={2}
                            >
                                {items.map((item, index) => (
                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                        {(provided) => (
                                            <Box
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                w="45px"
                                                h="45px"
                                                bg="blue.500"
                                                mb={2}
                                            >
                                                <Text fontSize="xs" color="white" textAlign="center">
                                                    {item.content}
                                                </Text>
                                            </Box>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>

                    <Box w={`${GRID_SIZE * CELL_SIZE}px`} h={`${GRID_SIZE * CELL_SIZE}px`} bg="gray.200" ml={4}>
                        {grid.map((row, rowIndex) => (
                            <Flex key={rowIndex}>
                                {row.map((cell, colIndex) => (
                                    <Droppable key={`${rowIndex}-${colIndex}`} droppableId={`grid-${rowIndex}-${colIndex}`}>
                                        {(provided) => (
                                            <Box
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                w={`${CELL_SIZE}px`}
                                                h={`${CELL_SIZE}px`}
                                                border="1px solid"
                                                borderColor="gray.300"
                                            >
                                                {cell && (
                                                    <Box w="100%" h="100%" bg="blue.500">
                                                        <Text fontSize="xs" color="white" textAlign="center">
                                                            {items.find(item => item.id === cell)?.content}
                                                        </Text>
                                                    </Box>
                                                )}
                                                {provided.placeholder}
                                            </Box>
                                        )}
                                    </Droppable>
                                ))}
                            </Flex>
                        ))}
                    </Box>
                </Flex>
            </DragDropContext>
        </ChakraProvider>
    );
};

export default DragDropGrid;