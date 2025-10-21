"use client";
import {
  Box,
} from "@mantine/core";
import { animate, svg } from "animejs";
import { useLayoutEffect, useRef } from "react";

type Props = {
  enableAnimation?: boolean
}

export default function SupaboshLogo({ enableAnimation = false }: Props) {
  const svgRef = useRef(null);

  useLayoutEffect(() => {

    if (svgRef.current && enableAnimation) {
      animate(svg.createDrawable(svgRef.current), {
        draw: "0 1",
        ease: "inOutQuad",
        duration: 2000,
        delay: 500,
      });
    }
  }, []);

  return (
    <Box c="blue" >
      <svg
        
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="lightingbolt"
        x="0px"
        y="0px"
        viewBox="0 0 188.0001 232.9621"
        enableBackground="new 0 0 188.0001 232.9621"
        xmlSpace="preserve"
        width="100%"
        height="100%"


      >
        <g
          style={{
            stroke: "currentColor",
            fill: "currentColor",
            fillRule: "evenodd",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "5",
          }}
        >
          <path
            style={{
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 5,
            }}
            ref={svgRef}
            className="line"

            d="M162.7143,107.0637c-0.7402-1.1211-1.9961-1.7969-3.3398-1.7969H95.855V3.9973   c0-1.918-1.3633-3.5664-3.248-3.9297c-1.877-0.3477-3.7598,0.6719-4.4688,2.4531L29.0171,151.4153   c-0.4902,1.2305-0.3379,2.625,0.4082,3.7227c0.7441,1.0977,1.9824,1.7539,3.3086,1.7539h71.3535v72.0703   c0,1.8984,1.3359,3.5352,3.1953,3.918c0.2695,0.0547,0.5391,0.082,0.8066,0.082c1.5723,0,3.0352-0.9336,3.6738-2.4258   l51.2871-119.6953C163.5815,109.6067,163.4546,108.1887,162.7143,107.0637z M112.0874,209.4699v-56.5781c0-2.2109-1.791-4-4-4   H38.6264L87.855,24.9114v84.3555c0,2.2109,1.791,4,4,4h61.4531L112.0874,209.4699z"
          />
        </g>
      </svg>
    </Box>
  );
}
