import React, { useRef, useState, Suspense } from "react";
export const Colors = {
	WHITE: 0,
	BLACK: 1,
};

export const getRandomChessImagePath = () => {
	let i = Math.floor(Math.random() * 5);
	return "url(/assets/bg" + i + ".jpg)";
};
