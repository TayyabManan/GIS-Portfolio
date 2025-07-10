import { Metadata } from 'next'
import Link from 'next/link'
import { MapIcon, ChartBarIcon, GlobeAltIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
  title: 'GIS Services',
  description: 'Professional GIS consulting services including spatial analysis, urban planning, environmental assessment, and custom mapping solutions for local businesses and organizations.',
  keywords: [
    'GIS services',
    'spatial analysis',
    'urban planning consultant',
    'environmental assessment',
    'mapping services',
    'GIS consulting',
    'geospatial solutions',
    'land use planning',
    'location intelligence'
  ],
  openGraph: {
    title: 'Professional GIS Services - Tayyab Manan',
    description: 'Expert GIS consulting and spatial analysis services for urban planning, environmental projects, and business intelligence.',
    url: '/services',
  },
}

const services = [
  {
    icon: MapIcon,
    title: 'Spatial Analysis & Modeling',
    description: 'Advanced spatial analysis for urban planning, environmental impact assessment, and site selection. Includes proximity analysis, suitability modeling, and predictive analytics.',
    features: [
      'Site Suitability Analysis',
      'Buffer & Proximity Analysis',
      'Hotspot Detection',
      'Spatial Statistics',
      'Predictive Modeling'
    ]
  },
  {
    icon: BuildingOffice2Icon,
    title: 'Urban Planning & Development',
    description: 'Comprehensive GIS solutions for urban planners, developers, and municipal governments. Supporting sustainable development and smart city initiatives.',
    features: [
      'Land Use Planning',
      'Zoning Analysis',
      'Transportation Planning',
      'Infrastructure Assessment',
      'Growth Modeling'
    ]
  },
  {
    icon: ChartBarIcon,
    title: 'Environmental Assessment',
    description: 'Environmental impact studies, habitat analysis, and natural resource management using cutting-edge GIS technology and remote sensing data.',
    features: [
      'Environmental Impact Assessment',
      'Habitat Mapping',
      'Watershed Analysis',
      'Climate Change Modeling',
      'Biodiversity Studies'
    ]
  },
  {
    icon: GlobeAltIcon,
    title: 'Custom Mapping Solutions',
    description: 'Interactive web maps, dashboard development, and custom GIS applications tailored to your specific business needs and workflows.',
    features: [
      'Interactive Web Maps',
      'Dashboard Development',
      'Mobile GIS Apps',
      'Data Visualization',
      'API Integration'
    ]
  }
]

const process = [
  {
    step: '01',
    title: 'Consultation',
    description: 'Initial meeting to understand your project requirements, objectives, and constraints.'
  },
  {
    step: '02',
    title: 'Data Collection',
    description: 'Gathering and processing relevant spatial data from various sources including government databases and field surveys.'
  },
  {
    step: '03',
    title: 'Analysis',
    description: 'Performing sophisticated spatial analysis using industry-standard GIS software and methodologies.'
  },
  {
    step: '04',
    title: 'Delivery',
    description: 'Providing comprehensive reports, maps, and interactive solutions with ongoing support.'
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
              Professional GIS Services
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Expert geospatial consulting and spatial analysis services for businesses, government agencies, 
              and organizations. Transforming location data into actionable insights.
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
              Comprehensive GIS Solutions
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From spatial analysis to custom mapping applications, we provide end-to-end GIS services 
              that help you make informed decisions based on location intelligence.
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
                Ready to start your GIS project?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Contact us today for a free consultation and discover how our GIS expertise can benefit your organization.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a
                  href="/contact"
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get started
                </a>
                <a href="mailto:contact@tayyabmanan.com" className="text-sm font-semibold leading-6 text-white">
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