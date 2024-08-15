<script type="ts">
  import { 
    localStore,
    parseDiceString,
    rollDice
  } from '$lib';

  let character = localStore('character', {
    name: 'Player',
    level: 7,
    hp: 10,
    hp_current: 10,
    ac: 10,
    ini: 10,
    speed: 30,
    ancestry: 'Human',
    background: 'Acolyte',
    class: 'Monk',
    str: 10,
    dex: 10,
    con: 10,
    int: 10,
    wis: 10,
    cha: 10,
    skills: [
{
name: 'Athletics',
attribute: 'str',
isProf: false,
},
{
name: 'Acrobatics',
attribute: 'dex',
isProf: false,
},
{
name: 'Sleight of Hand',
attribute: 'dex',
isProf: false,
},
{
name: 'Stealth',
attribute: 'dex',
isProf: false,
},
{
name: 'Arcana',
attribute: 'int',
isProf: false,
},
{
name: 'History',
attribute: 'int',
isProf: false,
},
{
name: 'Investigation',
attribute: 'int',
isProf: false,
},
{
name: 'Nature',
attribute: 'int',
isProf: false,
},
{
name: 'Religion',
attribute: 'int',
isProf: false,
},
{
name: 'Animal Handling',
attribute: 'wis',
isProf: false,
},
{
name: 'Insight',
attribute: 'wis',
isProf: false,
},
{
name: 'Medicine',
attribute: 'wis',
isProf: false,
},
{
name: 'Perception',
attribute: 'wis',
isProf: false,
},
{
name: 'Survival',
attribute: 'wis',
isProf: false,
},
{
name: 'Deception',
attribute: 'cha',
isProf: false,
},
{
name: 'Intimidation',
attribute: 'cha',
isProf: false,
},
{
name: 'Performance',
attribute: 'cha',
isProf: false,
},
{
name: 'Persuasion',
attribute: 'cha',
isProf: false,
},
    ],
  });
  const profBonus = [2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6];
const skillIcons = {
'Athletics': 'person-running',
'Acrobatics': 'dumbbell',
'Sleight of Hand': 'hand',
'Stealth': 'hood-cloak',
'Arcana': 'hat-wizard',
'History': 'landmark-dome',
'Investigation': 'magnifying-glass',
'Nature': 'leaf',
'Religion': 'church',
'Animal Handling': 'cat',
'Insight': 'user-magnifying-glass',
'Medicine': 'briefcase-medical',
'Perception': 'binoculars',
'Survival': 'paw-claws',
'Deception': 'user-secret',
'Intimidation': 'face-scream',
'Performance': 'user-shakespeare',
'Persuasion': 'comment',
}
const attrIcons = {
  str: 't-rex',
  dex: 'rabbit-running',
  con: 'horse',
  int: 'crow',
  wis: 'unicorn',
  cha: 'cat',
}

const attributes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
const attributeNames = {
str: 'Strength',
dex: 'Dexterity',
con: 'Constitution',
int: 'Intelligence',
wis: 'Wisdom',
cha: 'Charisma',
}
  let rolls = $state([]);
  let showRolls = $state(false);

  function getAttrValue(attr) {
    return Math.floor((character[attr] - 10) / 2);
  }
  function getSkillValue(skill) {
    return getAttrValue(skill.attribute) + (skill.isProf ? profBonus[character.level - 1] : 0);
  }
  function addRoll(roll) {
    rolls = rolls.concat(roll);
    showRolls = true;
  }
</script>
<content>
  <div class="personal-info">
    <h2>Personal Info</h2>
    <input type="text" bind:value={character.name} />
    <input type="text" bind:value={character.backstory} />
    <input type="text" bind:value={character.ancestry} />
    <input type="text" bind:value={character.background} />
    <input type="text" bind:value={character.class} />
  </div>
  <div class="stats">
    <h2>Stats</h2><h2></h2>
    <div class="statblock">
      <label for="hp">HP</label>
      <input name="hp" type="text" bind:value={character.hp} />
    </div>
    <div class="statblock">
      <label for="ac">AC</label>
      <input name="ac" type="text" bind:value={character.ac} />
    </div>
    <div class="statblock">
      <label for="ini">Initiative</label>
      <input name="ini" type="text" bind:value={character.ini} />
    </div>
    <div class="statblock">
      <label for="speed">Speed</label>
      <input name="speed" type="text" bind:value={character.speed} />
    </div>
  </div>
  <div class="skills">
    <h2>Skills</h2>
    <table>
      <tbody>
  {#each character.skills ?? [] as skill}
    <tr class="skill ">
      <td style="text-align: center">
        <i class="fa-sharp fa-light fa-{skillIcons[skill.name]}"></i>
      </td>
      <td style="text-align: center">
        <input id={skill.name} type="checkbox" bind:checked={skill.isProf} />
      </td>
      <td>
        <label for={skill.name}>{skill.name}</label>
      </td>
      <td>
        <span name={skill.name} class="stat">+ {getSkillValue(skill)}</span>
      </td>
      <td>
        <i 
          class="fa-sharp fa-light fa-dice-d20"
          on:click={() => {
            const v = getSkillValue(skill);
            const r = rollDice(parseDiceString('1d20+'+v))
            r.name = skill.name;
            addRoll(r);
            }
          }
        ></i>
      </td>
    </tr>
  {/each}
      </tbody>
    </table>
  </div>
  <div>
    <div class="attributes">
      <h2>Attributes</h2>
      <table>
        <tbody>
          {#each attributes as attr}
          <tr class="attribute ">
            <td style="text-align: center">
              <i class="fa-sharp fa-light fa-{attrIcons[attr]}"></i>
            </td>
            <td><label for="str">{attributeNames[attr]}</label></td>
            <td><input id="{attr}" name="{attr}" type="text" bind:value={character[attr]} /></td>
            <td><span>+ {getAttrValue(attr)}</span></td>
            <td>
        <i 
          class="fa-sharp fa-light fa-dice-d20"
          on:click={() => {
            const v = getAttrValue(attr);
            const r = rollDice(parseDiceString('1d20+'+v))
            r.name = attributeNames[attr];
            addRoll(r);
            }
          }
        ></i>
              </td>
          </tr>
        {/each}
        </tbody>
      </table>
    </div>
    <div>
      <h2>Actions</h2>
    </div>
  </div>
</content>
<div class="rolls">
  <div style="margin-left: auto;">
    <i 
      class="fa-sharp fa-light fa-{showRolls ? 'chevron-down' : 'chevron-up'}"
      on:click={() => {showRolls = !showRolls}}
    ></i>
    <i 
      class="fa-sharp fa-light fa-circle-x"
      on:click={() => rolls = []}
    ></i>
  </div>
{#if showRolls}
  <table>
    <thead>
      <tr>
        <th>Roll</th>
        <th>Dice</th>
        <th>Sum</th>
      </tr>
    </thead>
    <tbody>
  {#each rolls as roll}
    <tr>
      <td><h3>{roll.name}</h3></td>
      <td><p>{roll.text}</p></td>
      <td><p>{roll.sum}</p></td>
    </tr>
  {/each}
    </tbody>
  </table>
{/if}
</div>

<style>
  * {
    box-sizing: border-box;
  }
  :root {
    --background: white;
    --secondary-background: #F8F8F8;
  }

  content {
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 36px;
    padding: 36px;
    font-size: 1.5rem;
  }
  @media(max-width: 650px) {
    content {
      grid-template-columns: 1fr;
    }
  }

  i {
    vertical-align: middle;
  }
  tr {
    background-color: var(--background);
    clip-path: xywh(0 0 100% 100% round 0.5em);
  }
  tr:nth-of-type(2n + 1) {
    background-color: var(--secondary-background);
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  td {
    padding:8px 0;
  }
  td:first-of-type {
    padding-left: 8px;
  }

  input:not([type="checkbox"]) {
    width: 36px;
    appearance: none;
    border: none;
    background-color: inherit;
    display: inline-block;
    font-size: 1.5rem;
  }

  input[type="checkbox"] {
    appearance: none;
    background-color: transparent;
    color: currentColor;
    width: 2em;
    height: 2em;
    border: 0.15em solid currentColor;
    border-radius: 0.25em;
    display: grid;
    place-content: center;
  }

  input[type="checkbox"]::before {
    content: "";
    width: 1em;
    height: 1em;
    border-radius: 0.1em;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em green;
    transform-origin: bottom left;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  }

  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }

  .stats {
    display: grid;
    gap: 16px;
    grid-template-columns: 1fr 1fr;
  }
  .statblock {
    display: flex;
    padding: 64px;
    border: 1px solid var(--secondary-background);
  }

  th {
    text-align: left;
  }

  p, h3, h2, h1 {
    margin: 0;
  }

  .rolls {
    width: 300px;
    position: sticky;
    bottom: 0;
    left: 100%;
    background: #F8F8F8;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    flex-direction: column;
  }

  .rolls table {
    margin-top: 8px;
  }
</style>
