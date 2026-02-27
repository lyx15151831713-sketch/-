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
  MessageCircle,
  Instagram,
  Globe,
  Mail,
  MapPin,
  CheckCircle2
} from 'lucide-react';

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-16 text-center">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 gradient-text"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-zinc-500 text-lg max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <div className="relative font-sans selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
              AI Product Manager & Designer
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-10 text-glow gradient-text">
              刘玉萱
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 max-w-4xl mx-auto font-light leading-loose">
              南京林业大学工业设计硕士 · 现任职于中国移动云能力中心
              <br />
              <span className="text-zinc-500 mt-4 block">
                AI 工程化交互｜智能自动化交付｜全栈设计提效｜体验治理闭环
              </span>
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-px h-12 bg-gradient-to-b from-indigo-500 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Stats/Highlights */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "实用新型专利", value: "20+" },
            { label: "走查效能提升", value: "20x" },
            { label: "数据处理耗时", value: "<100ms" },
            { label: "SLA 交付率", value: "96%" },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 gradient-text">{stat.value}</div>
              <div className="text-zinc-500 text-sm uppercase tracking-widest font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Paid Services */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="结合工业设计思维与 AI 技术底座，提供深度商业化与工程化咨询">
            付费服务
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "AI 产品架构咨询",
                desc: "从 0-1 定义智算平台、大模型数据工具及行业智能体架构，优化工程化交付路径。",
                icon: <Cpu className="w-6 h-6 text-indigo-400" />,
                price: "¥2000 / 小时",
                link: "#contact"
              },
              {
                title: "RAG 全链路交互设计",
                desc: "独立负责行业智能体 RAG 全链路交互设计，集成文档分块预览与召回测试调优。",
                icon: <Rocket className="w-6 h-6 text-purple-400" />,
                price: "¥5000 / 项目起",
                link: "#contact"
              },
              {
                title: "UI 设计走查自动化",
                desc: "基于 Node.js + Puppeteer 的全栈自动化工具部署，将单页面走查降至 1 分钟内。",
                icon: <Briefcase className="w-6 h-6 text-pink-400" />,
                price: "¥3000 / 部署",
                link: "#contact"
              }
            ].map((service, i) => (
              <motion.a
                key={i}
                href={service.link}
                whileHover={{ y: -10 }}
                className="glass-card p-10 rounded-3xl group block"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:gradient-text transition-all">{service.title}</h3>
                <p className="text-zinc-400 mb-8 leading-relaxed">{service.desc}</p>
                <div className="text-xl font-medium text-white/90">{service.price}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Career Timeline */}
      <section className="py-32 bg-zinc-950/50 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitle subtitle="在顶级互联网公司与国企核心部门积累的实战经验">
            职业履历
          </SectionTitle>
          <div className="space-y-12 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-gradient-to-b before:from-indigo-500 before:via-purple-500 before:to-pink-500">
            {[
              {
                company: "中国移动云能力中心",
                role: "AI 产品设计师",
                period: "2023.07 - 至今",
                desc: "主导天枢交付平台与大模型数据工具架构，荣获最佳新人奖。"
              },
              {
                company: "小红书",
                role: "活动产品经理实习生",
                period: "2022.09 - 2023.02",
                desc: "负责内容创作后台功能迭代，实现复杂需求 4 周内稳定上线。"
              },
              {
                company: "字节跳动",
                role: "商业产品经理实习生",
                period: "2022.04 - 2022.09",
                desc: "负责线索类广告智能化转型，支撑专项日均消耗提升至千万量级。"
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
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold gradient-text">{exp.company}</h3>
                  <span className="text-zinc-500 font-mono text-sm">{exp.period}</span>
                </div>
                <div className="text-white/70 font-medium mb-3">{exp.role}</div>
                <p className="text-zinc-500 leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="关于 AI 工程化、大模型数据治理与交互设计的深度思考">
            我的文章
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              {
                title: "智算业务下的 AI 工程化交付体系实践",
                date: "2024.12",
                tags: ["AI 工程化", "智算平台"],
                points: ["核心架构定义与落地", "交付流程全量闭环", "效能提升路径优化"],
                link: "#"
              },
              {
                title: "大模型数据底座的自动化构建与效能提升",
                date: "2024.10",
                tags: ["大模型", "数据治理"],
                points: ["20+ 复杂自动化算子定义", "数据清洗标准体系建设", "单文档处理耗时 <100ms"],
                link: "#"
              },
              {
                title: "从工业设计视角看 AI 产品的交互范式",
                date: "2024.08",
                tags: ["工业设计", "交互设计"],
                points: ["工业设计思维跨界应用", "RAG 交互范式创新设计", "用户体验度量体系建设"],
                link: "#"
              },
              {
                title: "UI 设计走查自动化：从 20 分钟到 1 分钟的跨越",
                date: "2024.05",
                tags: ["效能工具", "全栈开发"],
                points: ["全栈自动化工具自主开发", "50+ 项组件属性参数化", "跨团队沟通成本减少 30%"],
                link: "#"
              }
            ].map((article, i) => (
              <motion.a
                key={i}
                href={article.link}
                whileHover={{ y: -10 }}
                className="group card-hover-border bg-white/5 rounded-[2.5rem] overflow-hidden flex flex-col h-full p-10"
              >
                <div className="flex gap-3 mb-6">
                  {article.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:gradient-text transition-all leading-tight">
                  {article.title}
                </h3>
                <p className="text-zinc-500 font-mono text-sm mb-8">{article.date}</p>
                
                <div className="space-y-4 mb-10">
                  {article.points.map((point, k) => (
                    <div key={k} className="flex items-start gap-3 text-zinc-400">
                      <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                      <span className="text-lg">{point}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                  <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">阅读全文</span>
                  <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-32 bg-black text-white px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="主导与独立开发的代表性作品">
            核心产品
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "天枢交付平台",
                desc: "首创从立项到结项的全生命周期可视化视图，实现交付全量闭环。",
                tags: ["架构定义", "可视化"],
                points: ["全生命周期可视化视图", "自动化部署链路打通", "环境部署周期缩短 40%"],
                link: "#"
              },
              {
                name: "大模型数据底座",
                desc: "定义 20+ 项复杂自动化算子，实现数据准备由天级向小时级的跨越。",
                tags: ["自动化", "大模型"],
                points: ["20+ 复杂算子定义", "单文档处理 <100ms", "数据准备效能小时级跨越"],
                link: "#"
              },
              {
                name: "UI 走查自动化工具",
                desc: "独立发起并全栈开发的效能工具，支撑 100% 全量扫描。",
                tags: ["全栈开发", "效能提升"],
                points: ["50+ 项组件属性参数化", "像素对比算法集成", "单页面走查降至 1 分钟"],
                link: "#"
              }
            ].map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group card-hover-border bg-white/5 rounded-[3rem] overflow-hidden p-10 flex flex-col h-full"
              >
                <div className="flex gap-3 mb-8">
                  {product.tags.map((tag, j) => (
                    <span key={j} className="text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-tighter gradient-text">{product.name}</h3>
                <p className="text-zinc-400 leading-relaxed mb-8">{product.desc}</p>
                
                <div className="space-y-4 mb-12">
                  {product.points.map((point, k) => (
                    <div key={k} className="flex items-start gap-3 text-zinc-500">
                      <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                      <span className="text-base">{point}</span>
                    </div>
                  ))}
                </div>

                <motion.a 
                  href={product.link}
                  whileHover={{ x: 5 }}
                  className="mt-auto inline-flex items-center gap-4 text-lg font-bold group/btn"
                >
                  <span className="px-8 py-4 rounded-full bg-indigo-500 text-white flex items-center gap-3 shadow-[0_0_30px_rgba(99,102,241,0.3)] group-hover/btn:shadow-[0_0_40px_rgba(99,102,241,0.5)] transition-all w-full justify-center">
                    立即跳转 <ChevronRight className="w-5 h-5" />
                  </span>
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 px-6 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-8 gradient-text">联系我</h2>
            <p className="text-zinc-500 text-lg mb-12 leading-relaxed">
              如果您对 AI 产品架构、RAG 交互设计或效能工具开发感兴趣，欢迎通过以下渠道与我交流。
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-zinc-400">
                <Mail className="w-5 h-5" /> 15151831713@163.com
              </div>
              <div className="flex items-center gap-4 text-zinc-400">
                <MapPin className="w-5 h-5" /> 江苏 · 南京
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {[
              { name: "公众号", label: "AI 产品笔记", color: "bg-emerald-500/10 text-emerald-500" },
              { name: "小红书", label: "@刘玉萱", color: "bg-red-500/10 text-red-500" },
              { name: "微信", label: "15151831713", color: "bg-blue-500/10 text-blue-500" }
            ].map((social, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-32 h-32 rounded-2xl bg-white/5 border border-white/10 p-2 mb-4 relative group overflow-hidden">
                  {/* Placeholder for QR Code */}
                  <div className="w-full h-full bg-white/10 rounded-lg flex items-center justify-center">
                    <div className="w-24 h-24 border-2 border-dashed border-white/20 rounded-md flex items-center justify-center">
                      <span className="text-[10px] text-zinc-600">QR CODE</span>
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
              </div>
            ))}
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-zinc-600 text-sm font-mono">
          <div>© 2026 LIU YUXUAN. ALL RIGHTS RESERVED.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-white transition-colors">TERMS</a>
            <a href="#" className="hover:text-white transition-colors">COOKIES</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
