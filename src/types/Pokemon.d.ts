type PokemonLists = {
  count: number;
  next: string;
  previous: string|null;
  results: PokemonListsResult[]
}
type PokemonShort = {
   name: string;
  url: string;
}
type PokemonAbilities = {
ability: PokemonShort;
is_hidden: boolean;
  slot: number;
}
type PokemonGameIndeces = {
      game_index: number;
      version: PokemonShort;
}
type MovesVersionGDetails = {
          level_learned_at: number;
          move_learn_method: PokemonShort;
          version_group: PokemonShort;
}
type PokemonMoves = {
  move: PokemonShort;
  version_group_details: MovesVersionGDetails[];
};
type PokemonSpritesOthers = {
  dream_world: {
    front_default: string;
    front_female: string | null;
  }
};
type PokemonSpritesVersionsColors = {
  [string]: {
      back_default: string | null;
      back_gray: string | null;
      front_default: string | null;
      front_gray: string | null;
    }
}
type PokemonSpritesVersions = {
  [string]: PokemonSpritesVersionsColors;
};
type PokemonSprites = {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: PokemonSpritesOthers;
  versions: PokemonSpritesVersions;
};
type PokemonStats= {
      base_stat: number;
      effort: number;
      stat: PokemonShort;
}
type PokemonType = {
  
      slot: number;
      type: PokemonShort;

}
type PokemonSpecies = {
  color: {
    name: string;
    url: string;
  };
};
type PokemonDetails = {
  abilities: PokemonAbilities[];
  base_experience: number;
  forms: PokemonShort;
  game_indices: PokemonGameIndeces[];
  height: number;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: PokemonMoves[];
  name: string;
  order: number;
  species: PokemonShort;
  sprites: PokemonSprites;
  stats: PokemonStats[];
  types: PokemonType[];
  weight: number;
  moreDetails?: MoreDetails;
};
type MoreDetails = {
  abilities?: PokeAbility[];
  charactiristic?: PokeCharacter;
  color?: Name;
  gender?: Name;
  species?: PokeSpecies;
};
type Name = {
  name: string;
}
type CharDes = {
  description: string;
  language: {
    name: string;
  };
};
type PokeCharacter = {
  descriptions: CharDes[];
};
type PokeAbilityEntrie = {
  effect: string;
  language: {
    name: string;
  };
  short_effect: string;
};
type PokeAbilityFlavortext = {
  flavor_text: string;
  language: {
    name: string;
  };
};
type PokeAbility = {
  name: string;
  effect_entries: PokeAbilityEntrie[];
  flavor_text_entries: PokeAbilityFlavortext[];
};


type PokeSpecies = {
  base_happiness: number;
  capture_rate: number;
  color: Name;
  forms_switchable: boolean;
  gender_rate: number;
  generation: Name;
  growth_rate: Name;
  habitat: Name;
  has_gender_differences: string;
  hatch_counter: number;
  id: number;
  is_baby: string;
  is_legendary: string;
  is_mythical: string;
  name: string;
  shape: Name;
};
