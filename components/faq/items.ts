interface FAQItem {
  title: string;
  text: string;
}

const items: FAQItem[] = [
  {
    title: 'Qui sommes-nous ?',
    text:
      "Nous sommes trois frères passionnés de lecture et de technologies. Nous avons décidé de grouper nos connaissances pour pouvoir aider les libraires qui souffrent de la concurrence d'internet.",
  },
  {
    title: 'Combien ça coûte ?',
    text:
      "Pour le moment, nous n'avons pas prévu de monétiser ce site. Nous espérons aider lecteurs et libraires sans les contraindre.",
  },
  {
    title: 'Comment vous aider ?',
    text:
      'Rien de plus simple : achetez des livres, parlez de nous à vos libraires et remontez nous les améliorations à apporter au site ! Pour ce faire, vous pouvez contacter Nicolas sur son adresse mail : nicolas.bruere31@gmail.com',
  },
];

export default items;
