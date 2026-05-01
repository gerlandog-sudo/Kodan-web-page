export default {
  name: 'home',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título Principal',
      type: 'string',
    },
    {
      name: 'heroImage',
      title: 'Imagen Hero',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bentoGrid',
      title: 'Bento Grid',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Título del Bloque' },
            { name: 'description', type: 'text', title: 'Descripción' },
            { name: 'size', type: 'string', title: 'Tamaño (1x1, 2x1, 2x2)', options: { list: ['1x1', '2x1', '2x2'] } }
          ]
        }
      ]
    }
  ],
}
