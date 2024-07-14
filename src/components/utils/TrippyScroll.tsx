'use client'
import { useTransform, useScroll, motion } from "framer-motion";
import { useRef } from "react";

const TrippyScroll = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const rotate = useTransform(scrollYProgress, [0, 1], ["0deg", "90deg"]);

    return (
        <div ref={targetRef} className="relative z-0 h-[800vh] bg-neutral-200">
            <div className="sticky top-0 h-screen bg-white">
                <Trippy rotate={rotate} />
            </div>
        </div>
    );
};

const NUM_SECTIONS = 25;
const PADDING = `${100 / NUM_SECTIONS / 2}vmin`;

const generateSections = (count: number, color: string, rotate: any) => {
    if (count === NUM_SECTIONS) {
        return <></>;
    }

    const nextColor = color === "#0B0B0B" ? "#FF0000" : "#0B0B0B";

    return (
        <Section rotate={rotate} background={color}>
            {generateSections(count + 1, nextColor, rotate)}
        </Section>
    );
};

const Trippy = ({ rotate }: { rotate: any }) => {
    return (
        <motion.div className="absolute inset-0 overflow-hidden bg-[#0B0B0B]">
            {generateSections(0, "#0B0B0B", rotate)}
        </motion.div>
    );
};

const Section = ({ background, children, rotate }: { background: string, children: React.ReactNode, rotate: any }) => {
    return (
        <motion.div
            className="relative h-full w-full origin-center"
            style={{
                background,
                rotate,
                padding: PADDING,
            }}
        >
            {children}
        </motion.div>
    );
};

export default TrippyScroll;