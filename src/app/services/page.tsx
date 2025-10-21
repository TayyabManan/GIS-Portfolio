import { Metadata } from 'next'
import Link from 'next/link'
import { CpuChipIcon, ChartBarIcon, CloudIcon, CodeBracketIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'ML Engineering & AI Development Services',
  description: 'Professional ML engineering, AI development, and MLOps consulting services. Specializing in Computer Vision, NLP, multi-agent AI systems, and Geospatial AI solutions using PyTorch, TensorFlow, and LangChain.',
  keywords: [
    'ML engineering services',
    'AI development consulting',
    'machine learning consultant',
    'MLOps services',
    'computer vision development',
    'NLP solutions',
    'AI developer hire',
    'PyTorch consulting',
    'TensorFlow services',
    'LangChain development',
    'multi-agent AI systems',
    'geospatial AI services',
    'model deployment',
    'production ML systems',
    'AI consulting Pakistan',
    'remote ML engineer'
  ],
  openGraph: {
    title: 'ML Engineering & AI Development Services - Tayyab Manan',
    description: 'Expert ML engineering, AI development, and MLOps consulting. Building production ML systems, Computer Vision solutions, NLP applications, and Geospatial AI.',
    url: 'https://tayyabmanan.vercel.app/services',
    type: 'website',
    images: [
      {
        url: '/images/profile-picture.jpg',
        width: 1200,
        height: 630,
        alt: 'ML Engineering & AI Development Services',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ML Engineering & AI Development Services',
    description: 'Professional ML engineering, Computer Vision, NLP, and MLOps consulting services.',
    images: ['/images/profile-picture.jpg'],
  },
  alternates: {
    canonical: 'https://tayyabmanan.vercel.app/services',
  },
}

const services = [
  {
    icon: CpuChipIcon,
    title: 'ML Model Development & Training',
    description: 'Custom machine learning models using PyTorch, TensorFlow, and Scikit-learn for Computer Vision, NLP, and predictive analytics. From data preprocessing to production deployment.',
    features: [
      'Deep Learning Model Architecture',
      'Computer Vision Solutions (Object Detection, Image Segmentation)',
      'NLP & Text Analysis (Sentiment Analysis, Named Entity Recognition)',
      'Time Series Forecasting',
      'Transfer Learning & Fine-tuning',
      'Model Optimization & Quantization'
    ]
  },
  {
    icon: CodeBracketIcon,
    title: 'Multi-Agent AI Systems',
    description: 'Building production-ready multi-agent AI systems using LangChain, AutoGen, and CrewAI for complex automation workflows, intelligent assistants, and autonomous decision-making.',
    features: [
      'LangChain Application Development',
      'AutoGen Multi-Agent Orchestration',
      'CrewAI Workflow Automation',
      'RAG (Retrieval-Augmented Generation)',
      'Custom LLM Integration (OpenAI, Claude)',
      'Model Context Protocol Implementation'
    ]
  },
  {
    icon: CloudIcon,
    title: 'MLOps & Model Deployment',
    description: 'End-to-end ML pipeline development, model deployment, monitoring, and optimization for production environments. Ensuring your ML models are scalable, reliable, and maintainable.',
    features: [
      'Flask/FastAPI Model Serving',
      'Docker Containerization',
      'CI/CD Pipeline Setup',
      'Model Monitoring & A/B Testing',
      'Cloud Deployment (AWS, GCP, Vercel)',
      'Performance Optimization & Scaling'
    ]
  },
  {
    icon: ChartBarIcon,
    title: 'Geospatial AI Solutions',
    description: 'ML-powered geospatial analysis combining satellite imagery processing, predictive modeling, and location intelligence for environmental monitoring and agricultural applications.',
    features: [
      'Satellite Imagery Analysis (Google Earth Engine)',
      'Geospatial Predictive Modeling',
      'Environmental Monitoring Systems',
      'Agricultural Yield Prediction',
      'Remote Sensing & Computer Vision',
      'Interactive Geospatial Dashboards'
    ]
  }
]

const process = [
  {
    step: '01',
    title: 'Consultation & Requirements',
    description: 'Understanding your ML/AI needs, data landscape, and success metrics. Defining project scope and technical approach.'
  },
  {
    step: '02',
    title: 'Data Engineering & EDA',
    description: 'Data collection, cleaning, preprocessing, and exploratory analysis. Feature engineering and dataset preparation for model training.'
  },
  {
    step: '03',
    title: 'Model Development & Training',
    description: 'Building and training ML models using PyTorch, TensorFlow, or Scikit-learn. Hyperparameter tuning and performance optimization.'
  },
  {
    step: '04',
    title: 'Deployment & Monitoring',
    description: 'Production deployment with MLOps best practices. Continuous monitoring, A/B testing, and ongoing model improvements.'
  }
]

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-24 lg:px-8">
        <div className="mx-auto max-w-4xl py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              ML Engineering & AI Development Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Professional machine learning engineering and AI development services. Building production ML systems,
              Computer Vision solutions, NLP applications, and intelligent automation for businesses and startups.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Get a Quote
              </a>
              <Link href="/projects" className="text-sm font-semibold leading-6 text-gray-900">
                View Our Work <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-black">Our Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Comprehensive ML & AI Solutions
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From custom ML model development to production deployment, we provide end-to-end AI engineering services
              using PyTorch, TensorFlow, LangChain, and modern MLOps practices.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {services.map((service) => (
                <div key={service.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <service.icon className="h-5 w-5 flex-none text-black" aria-hidden="true" />
                    {service.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{service.description}</p>
                    <ul className="mt-4 space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <span className="h-1.5 w-1.5 bg-black rounded-full mr-3"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-black">Our Process</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How We Work
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Our proven methodology ensures successful project delivery from initial consultation to final implementation.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-4">
              {process.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-white font-bold text-xl">
                    {item.step}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
            <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to start your ML/AI project?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Contact us today for a free consultation and discover how machine learning and AI can transform your business.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="/contact"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </a>
                <a href="mailto:haris.a.mannan@gmail.com" className="text-sm font-semibold leading-6 text-white">
                  Email us <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}