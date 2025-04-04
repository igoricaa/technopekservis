import InfiniteSlider from '@/components/infinite-slider';
import { clients } from '@/data';
import Image from 'next/image';
import podrucjeDelovanja from '@/public/techno-pek-servis-podrucje-delovanja.webp';
import HeaderBanner from '@/components/ui/header-banner';
import CtaSection from '@/components/cta-section';
import Breadcrumbs from '@/components/breadcrumbs';

const AboutPage = () => {
  return (
    <main className='pt-28'>
      <HeaderBanner />
      <Breadcrumbs
        items={[
          { label: 'Početna', href: '/' },
          { label: 'O nama', href: '/o-nama' },
        ]}
      />
      <section className='pt-20 pb-30'>
        <div className='px-side max-w-5xl mx-auto'>
          <h1 className='text-5xl font-bold mb-10'>O nama</h1>
          <div className='space-y-4'>
            <p>
              Naša firma nudi visokokvalitetnu pekarsku opremu i profesionalne
              usluge održavanja, dok ponosno zastupamo širok asortiman opreme
              renomiranih proizvođača.
            </p>
            <p>
              Naš stručni tim pruža najbolja rešenja za vaše poslovanje, pružamo
              brz i efikasan servis koji uključuje redovno održavanje, popravke
              i zamenu delova.
            </p>
            <p>
              Naš cilj je visok nivo zadovoljstva kupaca, stoga nas
              kontaktirajte da saznate više o našim proizvodima i uslugama.
            </p>
            <div className='space-y-6 mt-10'>
              <h2 className='text-4xl font-bold'>Čime se mi bavimo </h2>
              <p>
                Naša firma se bavi prodajom i servisiranjem pekarske opreme,
                pružajući klijentima visokokvalitetnu opremu i profesionalne
                usluge održavanja. Svojim dugogodišnjim iskustvom u pekarskoj
                industriji, naš tim stručnjaka je tu da vam pruži najbolje
                savete i rešenja za vaše poslovanje. Ponosni smo na širok
                asortiman pekarske opreme renomiranih proizvodjača koje
                zastupmo.
              </p>
            </div>
            <div className='space-y-4 mt-10'>
              <h2 className='text-4xl font-bold'>Koga zastupamo</h2>
              <p className='mt-6'>
                Ponosni smo što možemo da vam ponudimo vrhunske proizvode od dva
                lidera u pekarskoj industriji - Bongard i Wiesheu.
              </p>
              <p>
                Zahvaljujući Bongardu i Wiesheu, možete biti sigurni da će vaša
                pekara uvek biti spremna da isporuči najukusnije i
                najkvalitetnije proizvode.
              </p>
            </div>
          </div>
        </div>

        <InfiniteSlider data={clients} className='mt-30' />

        <div className='px-side max-w-5xl mx-auto mt-30 flex justify-between items-center gap-12'>
          <div className='space-y-4'>
            <h2 className='text-4xl font-bold'>Područje delovanja</h2>
            <p className='mt-6'>
              Naša firma posluje na području Srbije, Crne Gore, Makedonije i
              Bosne i Hercegovine. Naša usluga obuhvata sve aspekte poslovanja u
              ovim zemljama.
            </p>
            <p>
              Bez obzira na to da li ste već prisutni na ovim tržištima ili tek
              započinjete svoje poslovanje, mi smo tu da vam pružimo podršku i
              pomoć u svim fazama vašeg poslovanja.
            </p>
          </div>
          <Image
            src={podrucjeDelovanja}
            alt='Techno Pek Servis - Područje delovanja'
            className='object-cover min-w-sm'
          />
        </div>
      </section>

      <CtaSection />
    </main>
  );
};

export default AboutPage;
