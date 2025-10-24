import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';
import { table } from '@sanity/table';
import { media } from 'sanity-plugin-media';
import { dashboardTool } from '@sanity/dashboard';
import { colorInput } from '@sanity/color-input';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { schemas } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'FixMyCredit.fyi CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            // Orderable blog posts
            orderableDocumentListDeskItem({
              type: 'blogPost',
              title: 'Blog Posts',
              S,
              context,
            }),
            S.divider(),
            // Regular document types
            S.documentTypeListItem('category').title('Categories'),
            S.documentTypeListItem('author').title('Authors'),
            S.documentTypeListItem('faq').title('FAQs'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('creditTool').title('Credit Tools'),
          ]),
    }),
    visionTool(),
    codeInput(),
    table(),
    media(),
    dashboardTool({
      widgets: [
        // You can add dashboard widgets here later
      ],
    }),
    colorInput(),
    unsplashImageAsset(),
  ],
  schema: {
    types: schemas,
  },
});

