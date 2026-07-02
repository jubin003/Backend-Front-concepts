import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function Gaspp() {
    useGSAP(() => {
        gsap.to('#box', {
            x: 250,
            repeat: -1,
            duration: 1,
            yoyo: true,

        });
    }, []);

    return (
        <div>
            <div id="box" className="mt-20 bg-green-400 w-20 h-20 ml-20 rounded-lg" />
        </div>
    );
}