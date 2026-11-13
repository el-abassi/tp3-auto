
import { View, Text, StyleSheet, FlatList } from 'react-native';

type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

const evenements: Evenement[] = [
  { id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits: 25 },
  { id: 'E02', titre: 'Conférence IA', categorie: 'Conférence', capacite: 70, inscrits: 52 },
  { id: 'E03', titre: 'Sécurité mobile', categorie: 'Atelier', capacite: 20, inscrits: 17 },
  { id: 'E04', titre: 'Design UI', categorie: 'Atelier', capacite: 18, inscrits: 9 },
  { id: 'E05', titre: 'Forum projets', categorie: 'Rencontre', capacite: 50, inscrits: 49 },
  { id: 'E06', titre: 'Découverte Git', categorie: 'Atelier', capacite: 24, inscrits: 24 },
];

const placesRestantes = (e: Evenement): number => {
  return Math.max(0, e.capacite - e.inscrits);
};

const statutEvenement = (e: Evenement): string => {
  const places = placesRestantes(e);

  if (places === 0) return 'Complet';
  if (places <= 3) return 'Presque complet';
  return 'Ouvert';
};

type BadgeProps = {
  statut: string;
};

const BadgeEtat = ({ statut }: BadgeProps) => {
  return (
    <View
      style={[
        styles.badge,
        statut === 'Complet'
          ? styles.complet
          : statut === 'Presque complet'
          ? styles.presque
          : styles.ouvert,
      ]}
    >
      <Text>{statut}</Text>
    </View>
  );
};

type CarteProps = {
  evenement: Evenement;
};

const CarteEvenement = ({ evenement }: CarteProps) => {
  return (
    <View style={styles.carte}>
      <View style={styles.enteteCarte}>
        <Text style={styles.titreCarte}>{evenement.titre}</Text>
        <BadgeEtat statut={statutEvenement(evenement)} />
      </View>

      <Text>Catégorie : {evenement.categorie}</Text>
      <Text>Places restantes : {placesRestantes(evenement)}</Text>
    </View>
  );
};

type StatistiqueProps = {
  titre: string;
  valeur: number;
};

const BlocStatistique = ({ titre, valeur }: StatistiqueProps) => {
  return (
    <View style={styles.blocStat}>
      <Text style={styles.valeur}>{valeur}</Text>
      <Text>{titre}</Text>
    </View>
  );
};

const nombreEvenements = evenements.length;

const nombreComplets = evenements.filter(
  e => placesRestantes(e) === 0
).length;

const nombreDisponibles = evenements.filter(
  e => placesRestantes(e) > 0
).length;

const totalPlaces = evenements.reduce(
  (total, e) => total + placesRestantes(e),
  0
);

const ateliersDisponibles = evenements.filter(
  e => e.categorie === 'Atelier' && placesRestantes(e) > 0
);

const mode: 'tous' | 'ateliers' = 'tous';

const evenementsAffiches =
  mode === 'tous' ? evenements : ateliersDisponibles;

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.titre}>CampusAgenda</Text>
      <Text style={styles.sousTitre}>Événements du campus</Text>

      <View style={styles.statistiques}>
        <BlocStatistique titre="Événements" valeur={nombreEvenements} />
        <BlocStatistique titre="Complets" valeur={nombreComplets} />
        <BlocStatistique titre="Disponibles" valeur={nombreDisponibles} />
        <BlocStatistique titre="Places restantes" valeur={totalPlaces} />
      </View>

      <Text style={styles.section}>
        Mode : {mode}
      </Text>

      <FlatList
        data={evenementsAffiches}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <CarteEvenement evenement={item} />
        )}
        ListEmptyComponent={
          <Text>Aucun événement disponible.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F7FD',
    padding: 18,
    paddingTop: 55,
  },
  titre: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#00235C',
    textAlign: 'center',
  },
  sousTitre: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
    color: '#555',
  },
  statistiques: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  blocStat: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  valeur: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  carte: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },
  enteteCarte: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  titreCarte: {
    fontSize: 16,
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: 8,
  },
  badge: {
    padding: 7,
    borderRadius: 8,
    marginVertical: 3,
  },
  complet: {
    backgroundColor: '#FECACA',
  },
  presque: {
    backgroundColor: '#FED7AA',
  },
  ouvert: {
    backgroundColor: '#BBF7D0',
  },
});
