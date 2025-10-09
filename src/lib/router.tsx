import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { PrivacyPolicy } from '../pages/PrivacyPolicy'
import { TermsOfService } from '../pages/TermsOfService'
import { CaseStudiesPage } from '../pages/CaseStudiesPage'
import { AgentTrainingPage } from '../pages/AgentTrainingPage'
import { ProductStudioPage } from '../pages/ProductStudioPage'
import { Layout } from '../components/Layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'agent-training',
        element: <AgentTrainingPage />
      },
      {
        path: 'product-studio',
        element: <ProductStudioPage />
      },
      {
        path: 'case-studies',
        element: <CaseStudiesPage />
      },
      {
        path: 'privacy',
        element: <PrivacyPolicy />
      },
      {
        path: 'terms',
        element: <TermsOfService />
      }
    ]
  }
])