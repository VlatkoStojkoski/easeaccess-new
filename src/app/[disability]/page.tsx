'use client';

import { useEffect, useRef } from "react";

export default function DisabilitySpecificPage({ params }: { params: { disability: string } }) {
	const firstRender = useRef(true);

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;

			console.log(`Disability-specific page for ${params.disability}`);

			const selectors: Record<string, string[]> = {
				cognitive: ['#toggle-reading-guide button', '#toggle-reading-focus button', '#set-contrast-1 button:nth-child(3)'],
				dyslexia: ['#toggle-dyslexia-font button', '#toggle-animation-play-state button'],
				blind: ['#set-speak-on button'],
			}

			const elements = selectors[params.disability];

			if (elements) {
				elements.forEach(selector => {
					const element = document.querySelector(selector) as HTMLButtonElement;

					if (element) {
						element.click();
					}
				});
			}
		}
	}, []);

	return (
		<></>
	);
}