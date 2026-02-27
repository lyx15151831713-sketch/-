import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion, useScroll, useTransform } from 'motion/react';
import { ParticleSystem } from './components/ParticleSystem';
import { 
  Briefcase, 
  Cpu, 
  FileText, 
  Rocket, 
  Award, 
  ExternalLink, 
  ChevronRight,
  Mail,
  MapPin,
  CheckCircle2,
  Trophy,
  GraduationCap,
  Layers,
  Zap,
  Target,
  Phone,
  MessageSquare,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

const SectionTitle = ({ englishTitle, chineseSubtitle }: { englishTitle: string; chineseSubtitle: string }) => (
  <div className="mb-20 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 gradient-text uppercase"
    >
      {englishTitle}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-zinc-400 text-sm mb-6 font-medium"
    >
      {chineseSubtitle}
    </motion.p>
    <div className="w-12 h-1 bg-indigo-500 mx-auto rounded-full" />
  </div>
);

const ScrollSection = ({ children, className = "", animate = false }: { children: React.ReactNode; className?: string; animate?: boolean }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.section
      ref={ref}
      style={animate ? { scale, opacity } : {}}
      className={`relative py-32 px-6 overflow-hidden ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const heroScaleY = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  return (
    <div className="relative font-sans selection:bg-white selection:text-black bg-[#050505] text-white">
      {/* Screen 1: Hero Section */}
      <section className="relative h-screen w-full overflow-hidden origin-top">
        <motion.div 
          style={{ opacity: heroOpacity, scale: heroScale, scaleY: heroScaleY, y: heroY }} 
          className="absolute inset-0 z-0 origin-top"
        >
          <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
            <color attach="background" args={['#050505']} />
            <ParticleSystem />
            <EffectComposer>
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
            </EffectComposer>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </motion.div>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ opacity: heroOpacity, scale: heroScale }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-xs font-semibold tracking-widest uppercase border border-indigo-500/30 rounded-full bg-indigo-500/10 text-indigo-400 backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]">
              AI Product Manager & Designer
            </span>
            <div className="relative overflow-hidden group">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-10 text-glow shimmer-container">
                <span className="gradient-text">LIU YUXUAN</span>
                <span className="text-white">.</span>
                <span className="gradient-text">AI</span>
                <div className="shimmer-overlay" />
              </h1>
            </div>
            <p className="text-lg md:text-xl text-zinc-400 max-w-4xl mx-auto font-light leading-loose">
              南京林业大学工业设计硕士 · 现任职于中国移动云能力中心
              <br />
              <span className="text-zinc-400 mt-4 block">
                <span className="text-white font-medium">AI</span> 工程化交互｜智能自动化交付｜全栈设计提效｜体验治理闭环
              </span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="cursor-pointer group flex flex-col items-center"
              onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
              <div className="w-px h-16 bg-white/10 relative overflow-hidden">
                <motion.div 
                  animate={{ y: [-64, 64] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-full h-full bg-gradient-to-b from-transparent via-indigo-500 to-transparent"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Screen 2: Honors & Experience */}
      <ScrollSection className="border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle englishTitle="Honors & Experience" chineseSubtitle="深耕 AI 领域，在头部互联网企业积累了丰富的实战经验" />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-stretch">
            <div className="lg:col-span-2 space-y-12 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-pink-500">
              {[
                {
                  company: "中国移动云能力中心",
                  role: "AI 产品设计师",
                  desc: "主导智算业务与 AI 智能体平台的交互架构，通过全栈开发走查工具与 RAG 链路设计，实现交付效能与 UI 还原度的工程化跨越。"
                },
                {
                  company: "小红书",
                  role: "活动产品经理实习生",
                  desc: "聚焦商业化后台体验，通过重构广告位配置路径与内容治理策略，显著降低了 75% 的问题反馈频率并提升 30% 的处理效能。"
                },
                {
                  company: "字节跳动",
                  role: "商业产品经理实习生",
                  desc: "负责线索类广告落地页的智能化转型，搭建 OCR 素材识别体系并设计 A/B Test 实验，支撑专项日均消耗从 40 万提升至千万量级。"
                }
              ].map((exp, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-1.5 w-[35px] h-[35px] rounded-full bg-black border border-indigo-500/50 flex items-center justify-center z-10">
                    <div className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold gradient-text">{exp.company}</h3>
                  </div>
                  <div className="text-white/80 font-medium mb-2 text-base">{exp.role}</div>
                  <p className="text-zinc-400 leading-relaxed text-sm">{exp.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="lg:col-span-1 p-10 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group flex flex-col justify-center glass-card">
              <Trophy className="absolute -right-4 -bottom-4 w-32 h-32 text-white/5 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
              <h3 className="text-xl font-bold mb-8 flex items-center gap-3">
                <Award className="w-5 h-5 text-indigo-400" /> 荣誉墙
              </h3>
              <ul className="space-y-6">
                {[
                  "“琢玉”一等奖",
                  "移动云最佳新人奖",
                  "20 篇实用新型专利",
                  "优秀硕士研究生",
                  "校级三好学生"
                ].map((honor, i) => (
                  <li key={i} className="flex items-center gap-4 text-zinc-400">
                    <CheckCircle2 className="w-4 h-4 text-indigo-500" />
                    <span className="text-base">{honor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollSection>

      {/* Screen 3: Core Competencies */}
      <ScrollSection className="bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <SectionTitle englishTitle="Core Competencies" chineseSubtitle="跨越设计与工程的界限，构建 AI 时代的全栈能力模型" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "AI 交互专家",
                points: ["RAG 三段式交互模型", "2GB 超大文档上传处理", "参数调优逻辑闭环"],
                icon: <MessageSquare className="w-6 h-6 text-white" />,
                tags: ["LLM Interaction", "Prompt Engineering", "RAG Architecture"]
              },
              {
                title: "设计工程化（全栈）",
                points: ["UI 自动化走查工具", "感性设计参数化转化", "全栈开发落地能力"],
                icon: <Layers className="w-6 h-6 text-white" />,
                tags: ["Full Stack Dev", "Design System", "Automation"]
              },
              {
                title: "架构交互设计师",
                points: ["天枢平台交付链路", "规划到部署全周期", "多环境自动化闭环"],
                icon: <Cpu className="w-6 h-6 text-white" />,
                tags: ["Cloud Native", "DevOps", "System Design"]
              },
              {
                title: "体验策略官",
                points: ["“体验官”系列活动", "NPS 25% 跃升", "增长曲线度量体系"],
                icon: <Target className="w-6 h-6 text-white" />,
                tags: ["User Research", "Data Analysis", "Strategy"]
              }
            ].map((comp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-8 rounded-3xl flex flex-col h-full"
              >
                <div className="flex items-center gap-5 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg">
                    {comp.icon}
                  </div>
                  <h3 className="text-xl font-bold">{comp.title}</h3>
                </div>
                
                <div className="space-y-4 mb-8 flex-1">
                  {comp.points.map((p, j) => (
                    <div key={j} className="flex items-center gap-3 text-zinc-400 text-sm">
                      <div className="w-5 h-5 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-indigo-500" />
                      </div>
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {comp.tags.map((tag, j) => (
                    <motion.span 
                      key={j} 
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 0.1)", borderColor: "rgba(99, 102, 241, 0.4)" }}
                      className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest cursor-default transition-all duration-300 gradient-text"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Screen 4: Project Spotlight */}
      <ScrollSection>
        <div className="max-w-7xl mx-auto">
          <SectionTitle englishTitle="Project Spotlight" chineseSubtitle="深度解析三个具有代表性的 AI 与工程化提效项目" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "A",
                name: "UI 走查自动化",
                type: "AI 项目",
                highlight: "Node.js + Puppeteer",
                data: "20min → 1min",
                desc: "独立全栈开发，实现像素对比与属性扫描，效率提升 20 倍。"
              },
              {
                id: "B",
                name: "RAG 交互体系",
                type: "前沿 AI",
                highlight: "可视化算子配置",
                data: "天级 → 小时级",
                desc: "设计三段式 RAG 模型，支持 2GB 文档上传，效能跨越式提升。"
              },
              {
                id: "C",
                name: "天枢体验专项",
                type: "业务提效",
                highlight: "全生命周期闭环",
                data: "NPS +25%",
                desc: "重构可视化视图，部署周期缩短 40%，SLA 达成率 96%。"
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group card-hover-border bg-white/5 rounded-3xl p-8 flex flex-col h-full border border-white/5 hover:border-indigo-500/50 transition-all duration-500"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest border border-indigo-500/20">
                    {project.type}
                  </span>
                  <span className="text-zinc-400 font-mono text-[10px]">0{i+1}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 tracking-tighter group-hover:gradient-text transition-all duration-500">{project.name}</h3>
                
                <div className="space-y-4 mb-8 flex-1">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                    <div className="text-[10px] text-zinc-400 uppercase tracking-widest mb-1">Highlight</div>
                    <div className="text-sm text-white/90 font-medium">{project.highlight}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
                    <div className="text-[10px] text-indigo-400 uppercase tracking-widest mb-1">Impact</div>
                    <div className="text-2xl font-bold gradient-text">{project.data}</div>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed px-1">{project.desc}</p>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 rounded-2xl bg-indigo-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all"
                >
                  View Case Study
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Screen 4.5: Side Project */}
      <ScrollSection className="bg-zinc-950/30">
        <div className="max-w-6xl mx-auto h-full flex flex-col justify-center">
          <div className="mb-12">
            <SectionTitle englishTitle="Side Project" chineseSubtitle="考研 IP 孵化与全链路商业闭环管理" />
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center text-indigo-400/80 italic text-base font-light -mt-12 max-w-3xl mx-auto"
            >
              “在 2C 领域的独立实战，验证了我对用户底层需求洞察及商业转化的敏锐度。”
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left: IP & Funnel (Compact) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-4 glass-card p-6 rounded-3xl flex flex-col justify-between border-indigo-500/10"
            >
              <div className="mb-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest font-bold">Xiaohongshu IP</div>
                    <h3 className="text-2xl font-bold text-white tracking-tighter">Sadhu在努力</h3>
                  </div>
                  <div className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-[8px] text-indigo-400 font-mono">EST. 2020</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <div className="text-lg font-bold text-white">8K+</div>
                    <div className="text-[7px] text-zinc-500 uppercase tracking-widest">Fans</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <div className="text-lg font-bold text-white">10W+</div>
                    <div className="text-[7px] text-zinc-500 uppercase tracking-widest">Viral</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[9px] text-zinc-500 uppercase tracking-widest text-center mb-2">Conversion Funnel</div>
                {[
                  { label: "公域曝光", value: "10W+", width: "w-full", color: "bg-indigo-500/10" },
                  { label: "私域留存", value: "8000+", width: "w-[80%]", color: "bg-indigo-500/20" },
                  { label: "付费转化", value: "5W+", width: "w-[60%]", color: "bg-indigo-500/30" }
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className={`${step.width} ${step.color} h-10 rounded-lg border border-white/5 flex items-center justify-between px-4 relative overflow-hidden`}>
                      <span className="text-[8px] font-bold text-white/50 uppercase">{step.label}</span>
                      <span className="text-xs font-mono font-bold text-white">{step.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Strategy & Monetization (Organized) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6 rounded-3xl border-white/5 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h4 className="text-lg font-bold">增长策略与内容工程</h4>
                </div>
                <div className="space-y-4 flex-1">
                  {[
                    { t: "生命周期管理", d: "全方位调研备考痛点，构建公域获客到长尾转化的闭环。" },
                    { t: "节点精准运营", d: "细化至周级，在 3/5/10 月关键节点加大投放，ROI 最大化。" },
                    { t: "内容矩阵设计", d: "涨粉引流、心智强化、高转化变现三位一体，确保持续性。" }
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-xs font-bold text-indigo-400 mb-1">{item.t}</div>
                      <p className="text-zinc-400 text-[11px] leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glass-card p-6 rounded-3xl border-white/5 flex flex-col"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                    <DollarSign className="w-5 h-5 text-purple-400" />
                  </div>
                  <h4 className="text-lg font-bold">商业化与私域闭环</h4>
                </div>
                <div className="space-y-4 flex-1">
                  {[
                    { t: "信任重塑链路", d: "通过 1 小时免费通话及深度答疑建立专业信任感，提升转化率。" },
                    { t: "SKU 矩阵开发", d: "独立定义入门、冲刺、核心资料多款产品，实现分层销售。" },
                    { t: "量化成果", d: "产出多篇 10W+ 爆款，获赞收藏 7W+，实现商业变现 5W+。" }
                  ].map((item, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-white/5 border border-white/5">
                      <div className="text-xs font-bold text-purple-400 mb-1">{item.t}</div>
                      <p className="text-zinc-400 text-[11px] leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["#用户增长", "#内容策略", "#私域变现", "#商业化闭环"].map((tag, i) => (
              <motion.span 
                key={i} 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(99, 102, 241, 0.1)" }}
                className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[10px] font-bold gradient-text uppercase tracking-widest cursor-default transition-all"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Screen 5: Footer */}
      <footer id="contact" className="relative py-32 px-6 bg-black border-t border-white/5 overflow-hidden">
        {/* Tech Background */}
        <div className="absolute inset-0 tech-grid opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_70%)]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text uppercase tracking-tighter">Contact Me</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
              期待与您共同探索设计与技术的边界。
            </p>
          </div>

          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full max-w-4xl">
              {[
                { name: "公众号", label: "AI 产品笔记", color: "bg-emerald-500/10 text-emerald-500" },
                { name: "小红书", label: "@刘玉萱", color: "bg-red-500/10 text-red-500" },
                { name: "微信", label: "15151831713", color: "bg-blue-500/10 text-blue-500" }
              ].map((social, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 rounded-xl bg-white/5 border border-white/10 p-2 mb-4 relative group overflow-hidden glass-card">
                    <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
                      <div className="w-24 h-24 border-2 border-dashed border-white/20 rounded-md flex items-center justify-center">
                        <span className="text-[10px] text-zinc-400">QR CODE</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest">扫码关注</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-2 ${social.color}`}>
                    {social.name}
                  </span>
                  <span className="text-zinc-400 text-sm">{social.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-32 pt-12 border-t border-white/5 flex flex-col items-center gap-6 text-zinc-400 text-[10px] font-mono text-center">
            <div className="opacity-60">© 2026 LIU YUXUAN. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-8 opacity-60">
              <span className="hover:text-white transition-colors cursor-pointer">PRIVACY</span>
              <span className="hover:text-white transition-colors cursor-pointer">TERMS</span>
              <span className="hover:text-white transition-colors cursor-pointer">COOKIES</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
