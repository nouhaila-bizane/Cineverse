import { useState, useEffect, useRef, useMemo, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Image } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FiPlay, FiChevronDown, FiCalendar, FiStar } from 'react-icons/fi';
import api from '../services/api';

// ============================================
// 🌀 PILIER CENTRAL (Optimisé)
// ============================================
function CentralPillar() {
    const particlesRef = useRef();
    const count = 600;

    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const speeds = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 3;
            positions[i * 3 + 1] = Math.random() * 40 - 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 3;
            speeds[i] = Math.random() * 0.08 + 0.03;

            const colorChoice = Math.random();
            if (colorChoice < 0.5) {
                colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 0.2;
            } else if (colorChoice < 0.8) {
                colors[i * 3] = 1; colors[i * 3 + 1] = 0; colors[i * 3 + 2] = 0.43;
            } else {
                colors[i * 3] = 1; colors[i * 3 + 1] = 0.2; colors[i * 3 + 2] = 0.2;
            }
        }
        return { positions, colors, speeds };
    }, []);

    useFrame(() => {
        if (particlesRef.current) {
            const pos = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < count; i++) {
                pos[i * 3 + 1] += particles.speeds[i];
                if (pos[i * 3 + 1] > 20) pos[i * 3 + 1] = -20;
                pos[i * 3] += Math.sin(pos[i * 3 + 1] * 0.5) * 0.02;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={particles.positions} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={count} array={particles.colors} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.12} vertexColors transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} />
        </points>
    );
}

// ============================================
//  CARTE EN SPIRALE SÉCURISÉE (AGRANDIE)
// ============================================
function SpiralMovieCard({ movie, index, totalCards }) {
    const groupRef = useRef();
    const angleOffset = (index / totalCards) * Math.PI * 2;
    const radius = 12;

    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.elapsedTime;
            const angle = angleOffset + time * 0.4;
            const spiralHeight = (index / totalCards) * 15 - 7.5;

            groupRef.current.position.x = Math.cos(angle) * radius;
            groupRef.current.position.z = Math.sin(angle) * radius;
            groupRef.current.position.y = spiralHeight;
            groupRef.current.rotation.y = -angle;
            groupRef.current.rotation.x = Math.sin(time * 0.5 + index) * 0.1;
        }
    });

    const imageUrl = useMemo(() => {
        if (!movie?.posterImage || !movie.posterImage.startsWith('http')) {
            return 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse';
        }
        return movie.posterImage;
    }, [movie]);

    return (
        <group ref={groupRef}>
            {/* ✅ Image qui remplit TOUTE la forme */}
            <Image
                url={imageUrl}
                transparent
                side={THREE.DoubleSide}
                position={[0, 0, 0.01]} // Légèrement devant la bordure
                scale={[3.3, 4.8, 1]} // ✅ Mêmes dimensions exactes que la bordure
            />

            {/* Bordure lumineuse (derrière l'image) */}
            <mesh position={[0, 0, -0.01]}>
                <planeGeometry args={[3.3, 4.8]} />
                <meshBasicMaterial color="#f0a3a6" transparent opacity={0.6} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} />
            </mesh>

            <pointLight position={[0, 0, 0.5]} intensity={2} color="#f0a3a6" distance={8} />
        </group>
    );
}

// ============================================
// 💨 FUMÉE COLORÉE (Allégée)
// ============================================
function ColoredSmoke() {
    const meshRef = useRef();
    const materialRef = useRef();

    const fragmentShader = `
    uniform float uTime;
    varying vec2 vUv;
    
    float random(vec2 st) { return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123); }
    float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
        float n = noise(vUv * 4.0 + uTime * 0.2);
        float n2 = noise(vUv * 6.0 - uTime * 0.3);
        
        vec3 col = mix(vec3(0.9, 0.04, 0.08), vec3(1.0, 0.0, 0.2), n * 0.5 + 0.5);
        col = mix(col, vec3(0.6, 0.0, 0.0), n2 * 0.5 + 0.5);
        
        float alpha = smoothstep(-0.3, 0.7, n) * 0.3;
        gl_FragColor = vec4(col, alpha * 0.5);
    }
  `;

    const uniforms = useMemo(() => ({ uTime: { value: 0 } }), []);

    useFrame((state) => {
        if (materialRef.current) materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        if (meshRef.current) {
            meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[30, 32, 32]} />
            <shaderMaterial ref={materialRef} fragmentShader={fragmentShader} uniforms={uniforms} transparent side={THREE.BackSide} depthWrite={false} />
        </mesh>
    );
}

// ============================================
//  SCÈNE 3D AVEC POSTERS AGRANDIS
// ============================================
function MoviesSpiralScene({ movies }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 28], fov: 65 }} // ✅ Camera reculée : de 20 à 28 pour voir les grands posters
            gl={{ antialias: false, alpha: true, powerPreference: "low-power", preserveDrawingBuffer: true }}
            dpr={[1, 1]}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <pointLight position={[0, 10, 0]} intensity={2} color="#E50914" />
                <pointLight position={[0, -10, 0]} intensity={1} color="#ff006e" />

                <Stars radius={100} depth={50} count={3000} factor={4} saturation={0.4} fade speed={1.5} />
                <ColoredSmoke />
                <CentralPillar />
                <Sparkles count={150} scale={35} size={4} speed={0.4} color="#E50914" />
                <Sparkles count={100} scale={30} size={3} speed={0.3} color="#ff006e" />

                {movies.length > 0 && movies.slice(0, 6).map((movie, index) => (
                    <SpiralMovieCard key={movie._id} movie={movie} index={index} totalCards={6} />
                ))}

                <EffectComposer multisampling={0}>
                    <Bloom luminanceThreshold={0.4} luminanceSmoothing={0.9} height={200} intensity={1.5} />
                    <Noise opacity={0.02} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Suspense>
        </Canvas>
    );
}

// ============================================
// 🏠 PAGE D'ACCUEIL
// ============================================
const Home = () => {
    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await api.get('/movies');
            setAllMovies(response.data);
        } catch (error) {
            console.error('Erreur:', error);
        } finally {
            setLoading(false);
        }
    };

    const featuredMovies = allMovies.filter(m => m.type !== 'ComingSoon').slice(0, 9);
    const comingSoonMovies = allMovies.filter(m => m.type === 'ComingSoon').slice(0, 6);

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center"><div className="text-[#E50914] text-2xl font-bold animate-pulse">Chargement...</div></div>;
    }

    return (
        <div className="min-h-screen bg-black overflow-x-hidden relative">
            <div className="fixed inset-0 z-0">
                <MoviesSpiralScene movies={allMovies} />
            </div>
            <div className="fixed inset-0 bg-black/40 z-0 pointer-events-none" />

            <div className="relative z-10">
                <motion.section style={{ opacity, scale }} className="h-screen flex items-center justify-center">
                    <div className="text-center px-4">
                        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-8xl md:text-9xl font-black mb-6" style={{ background: 'linear-gradient(135deg, #cf656a 0%, #ff006e 50%, #cc0000 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', filter: 'drop-shadow(0 0 40px rgba(229,9,20,0.6))' }}>CineVerse</motion.h1>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-xl text-gray-300 mb-10">L'expérience cinématographique ultime</motion.p>
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
                            <Link to="/movies" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#E50914] to-[#ff006e] text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-110 transition-transform shadow-[0_0_30px_rgba(229,9,20,0.4)] hover:shadow-[0_0_50px_rgba(229,9,20,0.7)]"><FiPlay className="fill-current" /> Découvrir</Link>
                        </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, y: [0, 10, 0] }} transition={{ delay: 2, duration: 2, repeat: Infinity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-400"><FiChevronDown className="text-2xl" /></motion.div>
                </motion.section>

                <section className="py-32 px-4">
                    <div className="max-w-7xl mx-auto">
                        <motion.h2 initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-6xl md:text-7xl font-bold mb-20 text-center"><span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">À l'affiche</span></motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredMovies.map((movie, index) => (
                                <motion.div key={movie._id} initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.8 }} className="group cursor-pointer">
                                    <Link to={`/movie/${movie._id}`}>
                                        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black/60 backdrop-blur-sm border border-white/10">
                                            <div className="relative h-[500px]">
                                                <img src={movie.posterImage && movie.posterImage.startsWith('http') ? movie.posterImage : 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse'} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse'; }} />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                                <h3 className="text-2xl font-bold text-white mb-2">{movie.title}</h3>
                                                <div className="flex items-center gap-3 text-gray-300">
                                                    <span className="flex items-center gap-1"><FiStar className="text-yellow-500 fill-yellow-500" /> {movie.rating}/10</span>
                                                    <span>{movie.duration?.hours}h{movie.duration?.minutes}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-32 px-4 bg-gradient-to-b from-transparent to-black/80">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-6xl md:text-7xl font-bold mb-20 text-center"><span className="bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Prochainement</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {comingSoonMovies.map((movie, index) => (
                                <motion.div key={movie._id} initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1, duration: 0.8 }} className="group cursor-pointer">
                                    <Link to={`/movie/${movie._id}`}>
                                        <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-black/60 backdrop-blur-sm border border-white/10">
                                            <div className="relative h-[500px]">
                                                <img src={movie.posterImage && movie.posterImage.startsWith('http') ? movie.posterImage : 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse'} alt={movie.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" onError={(e) => { e.target.src = 'https://via.placeholder.com/300x450/1a1a1a/E50914?text=CineVerse'; }} />
                                                <div className="absolute top-4 right-4 bg-[#E50914] text-white px-4 py-2 rounded-full text-sm font-bold">BIENTÔT</div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                                                <h3 className="text-2xl font-bold text-white mb-2">{movie.title}</h3>
                                                {movie.showtimes?.[0] && <p className="text-gray-400 flex items-center gap-2"><FiCalendar />{new Date(movie.showtimes[0].date).toLocaleDateString('fr-FR')}</p>}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;