'use client';

import { motion } from 'framer-motion';

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <motion.div
                className="fixed inset-0 z-[100] bg-black pointer-events-none"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </>
    );
}
