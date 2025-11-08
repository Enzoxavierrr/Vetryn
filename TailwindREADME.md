# React + Vite

Para salvar o dev front`end, para entender o container no Tailwind!

# Tailwind: Containers e Dimensionamento (Guia Rápido)

## Containers recomendados
- **Centralizado (página)**
  
  ```html
  <div class="mx-auto max-w-screen-xl px-4 md:px-6">
    ...
  </div>
  ```

- **Seção full-bleed + conteúdo limitado**
  
  ```html
  <section class="bg-gradient-to-br from-primary-dark via-primary to-primary-light">
    <div class="mx-auto max-w-screen-xl px-4 md:px-6 py-16">
      ...
    </div>
  </section>
  ```

- **Duas colunas (texto + mídia/3D)**
  
  ```html
  <div class="mx-auto max-w-screen-2xl px-4 md:px-6">
    <div class="flex flex-col lg:flex-row items-start gap-10 md:gap-16">
      <div class="lg:basis-[45%] lg:pr-12">...</div>
      <div class="lg:basis-[55%]">...</div>
    </div>
  </div>
  ```

## Largura, altura e proporção
- Largura máxima: `max-w-screen-lg|xl|2xl` ou `max-w-[1200px]`
- Altura por viewport: `h-[60vh] md:h-[70vh] lg:h-[90vh]`
- Seção alta: `min-h-screen` ou `min-h-[120vh]`
- Canvas/WebComponents (ex.: Spline): aplique `style={{ width:'100%', height:'100%' }}` no elemento interno

## Overflow e bordas
- Evitar cortes: `overflow-visible` nos wrappers onde o conteúdo pode extrapolar
- Preferir “borda visual” sem clipping: `ring-1 ring-white/10` (em vez de `overflow-hidden`)

## Espaçamento e escala
- Respiro interno: `p-4 md:p-6`
- Diminuir levemente em mobile: `scale-[0.92] md:scale-100`

## Cheatsheet
- Container centralizado: `mx-auto max-w-screen-xl px-4`
- Full-bleed + inner container: seção full-width, conteúdo com `max-w-*`
- 2 colunas responsivas: `lg:basis-[45%]` + `lg:basis-[55%]`
- Altura responsiva: `h-[75vh] md:h-[85vh]`
- Sem cortes: `overflow-visible`
- Borda sutil: `ring-1 ring-white/10`