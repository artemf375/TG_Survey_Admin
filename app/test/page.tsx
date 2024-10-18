"use client";

import React, { useState, useEffect } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from "next/navigation";

export default function LadderPage() {
    const router = useRouter();

    const [elementSize, setElementSize] = useState<number | null>(null);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [currentMax, setCurrentMax] = useState<string>('px');
    const totalSteps: number = 10;

    useEffect(() => {
        const updateSize = () => {
            const mH = window.innerHeight;
            const mW = window.innerWidth;
            const max = Math.min(mH, mW) / totalSteps;
            setElementSize(Math.floor(max));
            setCurrentMax(mH > mW ? 'px' : 'px');
        };

        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const newStep = Math.floor(scrollPosition / window.innerHeight * totalSteps);
            setCurrentStep(Math.min(newStep, totalSteps - 1));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!elementSize) {
        return null;
    }

    return (
        <Flex className="relative bg-black" style={{ height: `${totalSteps * elementSize}vh` }}>
            <div className="fixed inset-0 flex items-center justify-center">
                <Flex position={"absolute"} color={'white'} ml={'50vw'} mt={'-40vh'} fontSize={'4xl'} zIndex={10}>
                    {currentStep >= totalSteps - 1 ? (
                        <Button
                            colorScheme="red"
                            onClick={() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                router.push("/admin");
                            }}
                        >
                            Log In
                        </Button>
                    ) : (
                        <Text>
                            {currentStep + 1}
                        </Text>
                    )}
                </Flex>
                <div className="relative" style={{ width: `${elementSize * totalSteps}${currentMax}`, height: `${elementSize * totalSteps}${currentMax}` }}>
                    {Array.from({ length: totalSteps + 1 }).map((_, index) => (
                        <div
                            key={index}
                            style={{
                                position: 'absolute',
                                width: `${elementSize}${currentMax}`,
                                height: `${elementSize}${currentMax}`,
                                left: `${elementSize * (index - 1)}${currentMax}`,
                                top: `${elementSize * (index - 1)}${currentMax}`,
                                borderWidth: '1px',
                                borderStyle: 'none none solid solid',
                                borderColor: 'white',
                                borderRadius: '0px 0px 0px 5px',
                                color: "white"
                            }}
                        >
                            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
                                <path
                                    d={`M0,0 L${100}%,0 L${100}%,${100}% L${elementSize}${currentMax},${100}% L${elementSize}${currentMax},${elementSize}${currentMax} L0,${elementSize}${currentMax} Z`}
                                    fill="white"
                                    stroke="white"
                                    strokeWidth="1"
                                />
                            </svg>
                        </div>
                    ))}
                    <div
                        style={{
                            position: 'absolute',
                            width: `${elementSize}${currentMax}`,
                            height: `${elementSize}${currentMax}`,
                            backgroundColor: '#ff333f',
                            transition: 'transform 100ms',
                            transform: `translate(${elementSize * currentStep}${currentMax}, ${elementSize * currentStep}${currentMax})`,
                            borderRadius: '0px 5px 0px 5px',
                        }}
                    />
                </div>
            </div>
        </Flex>
    );
}