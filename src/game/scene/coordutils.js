import React, { useRef, useState, Suspense } from "react";

export const getNotationFromCoords = (i, j) => {
	return encodeAlphabet(i) + encodeNum(j);
};

export const getCoordsFromNotation = (coord) => {
	return [decodeAlphabet(coord[0]), decodeNum(coord[1])];
};

const encodeAlphabet = (i) => {
	switch (i) {
		case 0:
			return "A";
		case 1:
			return "B";
		case 2:
			return "C";
		case 3:
			return "D";
		case 4:
			return "E";
		case 5:
			return "F";
		case 6:
			return "G";
		case 7:
			return "H";
	}
};

const encodeNum = (j) => {
	switch (j) {
		case 0:
			return "1";
		case 1:
			return "2";
		case 2:
			return "3";
		case 3:
			return "4";
		case 4:
			return "5";
		case 5:
			return "6";
		case 6:
			return "7";
		case 7:
			return "8";
	}
};
const decodeAlphabet = (i) => {
	switch (i) {
		case "A":
			return 0;
		case "B":
			return 1;
		case "C":
			return 2;
		case "D":
			return 3;
		case "E":
			return 4;
		case "F":
			return 5;
		case "G":
			return 6;
		case "H":
			return 7;
	}
};

const decodeNum = (j) => {
	switch (j) {
		case "1":
			return 0;
		case "2":
			return 1;
		case "3":
			return 2;
		case "4":
			return 3;
		case "5":
			return 4;
		case "6":
			return 5;
		case "7":
			return 6;
		case "8":
			return 7;
	}
};
