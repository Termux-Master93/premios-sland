
import 'photoswipe/style.css';
import editionsInfo from './data/meta-gallery.json';
import Button from './Button';
import { useState, useRef, useEffect } from 'preact/hooks';
import "../components/styles/Gallery.css";


type Masory<T> = T & { gap: string; maxcolwidth: string };
declare global {
  namespace preact.createElement.JSX {
    interface IntrinsicElements {
      ['masonry-layout']: Masory<JSX.HTMLAttributes>;
    }
  }
}

export default function Gallery({
  i18n, edicion
}: {
  i18n: any;
  edicion: string;
}) {
  const offset = 9;

  const editionIndex = Number(edicion) - 1;
  const photos = editionsInfo[editionIndex].slice(0, offset);
  const first = useRef<HTMLAnchorElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const init = async () => {
      await import('@appnest/masonry-layout');
      const module = await import('photoswipe/lightbox');
      const PhotoSwipeLightbox = module.default;
      const lightbox = new PhotoSwipeLightbox({
        gallery: '#gallery',
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      lightbox.init();
      console.log('Masonry loaded');
    };
    init();
  }, []);



const handleLoadMore = async (e: MouseEvent) => {
    e.preventDefault();
    const res = await fetch(`/pages/api/gallery.json?edition=${1}&offset=${offset}`);
    const images = await res.json();
    const html = images.map((img: any, index: number) => {
      const imgIndex = index + offset;
      if (!first.current) return;

      const clone = first.current.cloneNode(true) as HTMLElement;
      if (!clone) return;
      clone.setAttribute('data-pswp-width', img.width);
      clone.setAttribute('data-pswp-height', img.height);
      clone.setAttribute(
        'href',
        `/archivo-page/${edicion}/gallery/img-${imgIndex}.webp`
      )
      clone.classList.add('animate-fade-up');
      clone.classList.add('animate-delay-300');
      clone.classList.add('opacity-0');
      clone
        .querySelector('img:first-child')?.setAttribute(
          'src',
          `/archivo-page/${edicion}/gallery/thumbnails/img-${imgIndex}.webp`
        );
      clone
        .querySelector('img:last-child')?.setAttribute(
          'src',
          `/archivo-page/${edicion}/gallery/thumbnails/img-${imgIndex}.webp`
        )
      return clone?.outerHTML;
    }).join('');

    document
      .querySelector('#gallery')
      ?.insertAdjacentHTML('beforeend', html);
    document.querySelector('masonry-layout')?.scheduleLayout();

    setIsExpanded(true);
  }



  return (
    <section className="max-w-8xl mx-auto py-20 px-20">
      <h2 className="mx-auto mb-8 text-center text-3xl lg:text-6xl font-semibold tracking-wide"
      >Galería</h2>
      <p
        className="text-center text-2xl">Algunos de los mejores momentos de la gala que pasarán a la historia.</p>
      <masonry-layout
        gap="24"
        maxcolwidth='600'
        className='lg:mx-auto mx-4 py-20'
        id='gallery'
      >
        {
          photos.map(({ height, width }, i) => (
            <a
              className="group rounded-xl hover:scale-105 hover:contrast-[110%] transition-all relative"
              href={`/archivo-page/${edicion}/gallery/img-${i + 1
                }.webp`}
              target="_blank"
              data-cropped='true'
              data-pswp-width={width}
              data-pswp-height={height}
              ref={!first.current ? first : undefined}
            >
              <img
                className="rounded-xl object-cover w-full h-auto"
                loading={"lazy"}
                src={`/archivo-page/${edicion}/gallery/thumbnails/img-${i + 1}.webp`}
                alt='Fotografía de los premios ESLAND'
              />
              <img
                className='blur-md opacity-0 group-hover:opacity-100 absolute inset-0 transition contrast-150 -z-10 object-cover'
                loading='lazy'
                src={`/archivo-page/${edicion}/gallery/thumbnails/img-${i + 1}.webp`}
                alt='Imagen con efecto blur para hacer de sombra de una fotografía de los premios ESLAND'
              />
            </a>
          ))
        }
      </masonry-layout>
      <div className="text-center mx-auto">
        {!isExpanded && (
          <Button onClick={handleLoadMore} id='load-more' url='#'>
            Cargar mas pe
          </Button>
        )}
      </div>
    </section>
  )
}