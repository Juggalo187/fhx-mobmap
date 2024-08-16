/*
 (C)2006 TriMoon Inc.
 Author: Tri_Moon <tripple_moon_3m@yahoo.com>
 Ferentus NPC Locator

 This work is licensed under a Creative Commons License !
 See: http://creativecommons.org/licenses/by-nc-nd/2.5/
*/
var MapLoc = "FHX_MobMap/imgs/";
var domImgCell = document.getElementById("ImgCell");
var domImgDiv = document.getElementById("ImgDiv");
var domMapImg = document.getElementById("MapImg");
var domNPCImg = document.getElementById("NPCImg");
var domMapSelect = document.getElementById("SelectedMap");
var domNPCSelect = document.getElementById("SelectedNPC");
var SearchMap = String();
var SearchNPC = String();
function NPC(sName, sImg){
	this.Name = sName;
	this.Img = sImg;
};
function Map(sName, iWidth, iHeight, aNPCs){
	this.Name = sName;
	this.width = iWidth;
	this.height = iHeight;
	this.NPCs = aNPCs;
};
function InitMapOptions(){
	var DomObj, DomObj2;
	domMapSelect.options.length = 0;
	DomObj = document.createElement("option");
	DomObj2 = document.createTextNode("--- None ---");
	DomObj.appendChild( DomObj2 );
	domMapSelect.appendChild( DomObj );
	for( var loop=0; loop<Maps.length; loop++ ){
		DomObj = document.createElement("option");
		DomObj.setAttribute("value", Maps[loop].Name );
		DomObj2 = document.createTextNode(Maps[loop].Name);
		DomObj.appendChild( DomObj2 );
		if( SearchMap.toUpperCase() == Maps[loop].Name.toUpperCase() )
			DomObj.setAttribute("selected", "true");
		domMapSelect.appendChild( DomObj );
	};
	ShowMap();
};
function ShowMap(){
	InitNPCOptions();
	if(domMapSelect.selectedIndex < 1){
		domImgCell.setAttribute("width", "0");
		domImgCell.setAttribute("height", "0");
		domImgDiv.setAttribute("width", "0");
		domImgDiv.setAttribute("height", "0");
		domImgDiv.style.display = "none";
	}else{
		domImgCell.setAttribute("width", Maps[domMapSelect.selectedIndex-1].width);
		domImgCell.setAttribute("height", Maps[domMapSelect.selectedIndex-1].height);
		domImgDiv.setAttribute("width", Maps[domMapSelect.selectedIndex-1].width);
		domImgDiv.setAttribute("height", Maps[domMapSelect.selectedIndex-1].height);
		domImgDiv.style.display = "block";
		domMapImg.src = MapLoc + Maps[domMapSelect.selectedIndex-1].Name + ".gif";
		ShowNPC();
	};
};
function InitNPCOptions(){
	var DomObj, DomObj2;
	domNPCSelect.options.length = 0;
	DomObj = document.createElement("option");
	DomObj2 = document.createTextNode("--- None ---");
	DomObj.appendChild( DomObj2 );
	domNPCSelect.appendChild( DomObj );
	if(domMapSelect.selectedIndex > 0 && Maps[domMapSelect.selectedIndex-1].NPCs){
		for( var loop=0; loop<Maps[domMapSelect.selectedIndex-1].NPCs.length; loop++ ){
			DomObj = document.createElement("option");
			DomObj.setAttribute("value", Maps[domMapSelect.selectedIndex-1].NPCs[loop].Name );
			DomObj2 = document.createTextNode(Maps[domMapSelect.selectedIndex-1].NPCs[loop].Name);
			DomObj.appendChild( DomObj2 );
			if( SearchNPC.toUpperCase() == Maps[domMapSelect.selectedIndex-1].NPCs[loop].Name.toUpperCase() )
				DomObj.setAttribute("selected", "true");
			domNPCSelect.appendChild( DomObj );
		};
	};
};
function ShowNPC(){
	var NPCLoc = MapLoc + Maps[domMapSelect.selectedIndex-1].Name + "/";
	if(domNPCSelect.selectedIndex < 1)
		domNPCImg.src = NPCLoc + "Blank.gif";
	else
		if( Maps[domMapSelect.selectedIndex-1].NPCs[domNPCSelect.selectedIndex-1].Img )
			domNPCImg.src = NPCLoc + Maps[domMapSelect.selectedIndex-1].NPCs[domNPCSelect.selectedIndex-1].Img;
		else
			domNPCImg.src = "FHX_MobMap/UnKnown.gif";
};
function CapitalizeNSortNPCs(){
	var loopMap, loopNPC;
	for( loopMap=0; loopMap<Maps.length; loopMap++ ){
		for( loopNPC=0; loopNPC<Maps[loopMap].NPCs.length; loopNPC++ ){
			Maps[loopMap].NPCs[loopNPC].Name = Capitalize(Maps[loopMap].NPCs[loopNPC].Name);
		};
		Maps[loopMap].NPCs.sort(SortNPCs);
	};
};
function Capitalize(sString){
	var Words = sString.split(' ');
	for( var loop = 0; loop<Words.length; loop++ ){
		Words[loop] = Words[loop].toLowerCase();
		Words[loop] = Words[loop].toUpperCase().charAt(0) + Words[loop].substring(1);
	};
	return Words.join(' ');
};
function SortNPCs(oNPC1, oNPC2){
	if( oNPC1.Name < oNPC2.Name )
		return -1
	else if( oNPC1.Name > oNPC2.Name )
		return 1;
	else return 0;
};
function FindSearch(){
	var search = location.search.substring(1).split('&');
	if(location.search.length > 1){
		for( var loop = 0; loop<search.length; loop++ ){
			var re, cmd, arg, val;
			re = new RegExp("\\+", "g");
			cmd = search[loop].split('=');
			arg = cmd[0];
			val = decodeURIComponent( cmd[1] );
			val = val.replace(re, ' ');
//			alert( arg +" -> "+ val);
			switch(arg){
			case "Map":
						SearchMap = val;
						break;
			case "NPC":
						SearchNPC = val;
						break;
			default:
						break;
			}
		}
	}
};
/* NPCs Datatbase */
var Maps = new Array(
	new Map("Rog", 577, 461,
		new Array(
			new NPC("NPC Billy Folks", "NPC_BillyFolks.gif"
			),new NPC("NPC Gary Gomon", "NPC_GaryGomon.gif"
			),new NPC("NPC Loren Patosi", "NPC_LorenPatosi.gif"
			),new NPC("NPC Jone Williams", "NPC_JoneWilliams.gif"
			),new NPC("NPC Sam Andrea", "NPC_SamAndrea.gif"
			),new NPC("NPC Alex Son", "NPC_AlexSon.gif"
			),new NPC("NPC Tom Grimb", "NPC_TomGrimb.gif"
			),new NPC("NPC Elizabeth Ruin", "NPC_Ruins.gif"
			),new NPC("NPC Michael Ruin", "NPC_Ruins.gif"
			),new NPC("NPC Junior Ruin", "NPC_JuniorRuin.gif"
			),new NPC("NPC Jone M. Kaine", "NPC_JoneMKaine.gif"
			),new NPC("NPC Marcus Galwin", "NPC_Bank.gif"
			),new NPC("NPC Mari Strout", "NPC_Bank.gif"
			),new NPC("NPC Leo Canton", "NPC_Blacksmit.gif"
			),new NPC("NPC Lui Canton", "NPC_Blacksmit.gif"
			),new NPC("NPC McKinly Gilon", "NPC_Blacksmit.gif"
			),new NPC("NPC Alex Ancher", "NPC_Guild.gif"
			),new NPC("NPC James Jerome", "NPC_Guild.gif"
			),new NPC("NPC Union Rog", "NPC_Guild.gif"
			),new NPC("NPC Ainese Gray", "NPC_Grocer.gif"
			),new NPC("NPC Elia Baskin", "NPC_Grocer.gif"
			),new NPC("NPC Roland", "NPC_Material.gif"
			),new NPC("NPC Bulbai Andrea", "NPC_Mercenary.gif"
			),new NPC("NPC Bibia Layialbol", "NPC_Weapons.gif"
			),new NPC("NPC Elmo Leon", "NPC_Weapons.gif"
			),new NPC("NPC Luke Savage", "NPC_Weapons.gif"
			),new NPC("NPC Roy Clower", "NPC_Weapons.gif"
			),new NPC("Vagabond Wolf", "VagabondWolf.gif"
			),new NPC("Small spider", "SmallSpider.gif"
			),new NPC("Small stripe spider", "SmallStripeSpider.gif"
			),new NPC("Small grey wolf", "SmallGreyWolf.gif"
			),new NPC("Stripe spider", "StripeSpider.gif"
			),new NPC("Black Wolf", "BlackWolf.gif"
			),new NPC("Black wolf-pack Leader", "BlackWolf.gif"
			),new NPC("Grey wolf", "GreyWolf.gif"
			),new NPC("Small brown bear", "SmallBrownBear.gif"
			),new NPC("Small black bear", "SmallBlackBear.gif"
			),new NPC("Mutated poisonous spider", "MutatedPoisonousSpider.gif"
			),new NPC("Young Grizzly", "YoungGrizzly.gif"
			),new NPC("Suspicious Unknown Guy", "SuspiciousUnknownGuy.gif"
			),new NPC("Small Silver Wolf", "SmallSilverWolf.gif"
			),new NPC("Young Kujo", "YoungKujo.gif"
			),new NPC("Vagabond Orc thief", "VagabondOrcThief.gif"
			),new NPC("Goblin scout patrol", "GoblinScoutPatrol.gif"
			),new NPC("Goblin", "Goblin.gif"
			),new NPC("Vagabond Goblin", "VagabondGoblin.gif"
			),new NPC("Dark Eye", "VagabondGoblin.gif"
			),new NPC("Black Peanut", "VagabondGoblin.gif"
			),new NPC("Small brown stripe spider", "SmallBrownStripeSpider.gif"
			),new NPC("Vicious Goblin", "ViciousGoblin.gif"
			),new NPC("Young silver wolf", "YoungSilverWolf.gif"
			),new NPC("brown stripe spider", "BrownStripeSpider.gif"
			),new NPC("Silver wolf", "SilverWolf.gif"
			),new NPC("brown bear", "BrownBear.gif"
			),new NPC("black bear", "BlackBear.gif"
			),new NPC("Small black wolf", "SmallBlackWolf.gif"
			),new NPC("Vagabond black wolf", "VagabondBlackWolf.gif"
			),new NPC("Wandering man", "WanderingMan.gif"
			)
		)
	),new Map("Green", 420, 461,
		new Array(
			new NPC("NPC Andrea Bonen", "NPC_AndreaBonen.gif"
			),new NPC("NPC Blanko Luliks", "NPC_BlankoLuliks.gif"
			),new NPC("NPC Blue Raiki", "NPC_BlueRaiki.gif"
			),new NPC("NPC Doug Alivan", "NPC_DougAlivan.gif"
			),new NPC("NPC Drake Walter", "NPC_DrakeWalter.gif"
			),new NPC("NPC Pishuman Gelter", "NPC_PishumanGelter.gif"
			),new NPC("NPC Harold Beyond", "NPC_HaroldBeyond.gif"
			),new NPC("NPC Harold Pakins", "NPC_HaroldPakins.gif"
			),new NPC("NPC Hut Brain", "NPC_HutBrain.gif"
			),new NPC("NPC Julia Alain", "NPC_JuliaAlain.gif"
			),new NPC("NPC Kevin Dillon", "NPC_KevinDillon.gif"
			),new NPC("NPC Lich Togue", "NPC_LichTogue.gif"
			),new NPC("NPC Lino Schlion", "NPC_LinoSchlion.gif"
			),new NPC("NPC Lopez Hoak", "NPC_LopezHoak.gif"
			),new NPC("NPC Michael Kan", "NPC_MichaelKan.gif"
			),new NPC("NPC Miney Alzrael", "NPC_MineyAlzrael.gif"
			),new NPC("NPC Rosi Jones", "NPC_RosiJones.gif"
			),new NPC("NPC Sad Nieas", "NPC_SadNieas.gif"
			),new NPC("NPC Sheld Sepilar", "NPC_SheldSepilar.gif"
			),new NPC("NPC Tom Balancy", "NPC_TomBalancy.gif"
			),new NPC("NPC Trevor Mount", "NPC_TrevorMount.gif"
			),new NPC("NPC Water Spirit King", "NPC_WaterSpiritKing.gif"
			),new NPC("Black Jar", "BlackJar.gif"
			),new NPC("Giant black wolf", "GiantBlackWolf.gif"
			),new NPC("Killer wolf", "KillerWolf.gif"
			),new NPC("Small slime", "SmallSlime.gif"
			),new NPC("Contaminated Nieas", "ContaminatedNieas.gif"
			),new NPC("Cursed Nieas", "CursedNieas.gif"
			),new NPC("Small Grizzly", "SmallGrizzly.gif"
			),new NPC("Giant silver wolf", "GiantSilverWolf.gif"
			),new NPC("Grizzly", "Grizzly.gif"
			),new NPC("Giant brown bear", "GiantBrownBear.gif"
			),new NPC("Giant black bear", "GiantBlackBear.gif"
			),new NPC("Giant brown stripe spider", "GiantBrownStripeSpider.gif"
			),new NPC("Vicious Nieas", "ViciousNieas.gif"
			),new NPC("Slime", "Slime.gif"
			),new NPC("Tiger forest Goblin patrol", "TigerForestGoblinPatrol.gif"
			),new NPC("Tiger forest Goblin thief", "TigerForestGoblinThief.gif"
			),new NPC("Tiger forest Goblin warrior", "TigerForestGoblinWarrior.gif"
			),new NPC("Tiger forest goblin leader", "TigerForestGoblinWarrior.gif"
			),new NPC("Forest tiger goblin shamon", "TigerForestGoblinWarrior.gif"
			),new NPC("Forest Shikin", "ForestShikin.gif"
			),new NPC("Dark monk", "DarkMonk.gif"
			),new NPC("Kaienei offspring", "DarkMonk.gif"
			),new NPC("Contaminated croc", "ContaminatedCroc.gif"
			),new NPC("Valley Orc warrior commander", "GorgeOrcWarriorCommander.gif"
			),new NPC("Head Valley Orc warrior", "GorgeOrcWarriorCommander.gif"
			),new NPC("Valley orc shaman", "GorgeOrcWarriorCommander.gif"
			),new NPC("Valley orc rogue", "GorgeOrcWarriorCommander.gif"
			),new NPC("Valley orc archer", "GorgeOrcWarriorCommander.gif"
			),new NPC("traitor of Nieas", "TraitorOfNieas.gif"
			),new NPC("Valley Orc refugee", "GorgeOrcRefugee.gif"
			),new NPC("Poisonous spider", "PoisonousSpider.gif"
			),new NPC("Small fog scorpion", "SmallFogScorpion.gif"
			),new NPC("Small oblivious spider", "SmallObliviousSpider.gif"
			),new NPC("Valley orc warrior", "GorgeOrcWarriorCommander.gif"
			)
		)
	),new Map("Foggy", 625, 450,
		new Array(
			new NPC("Arena Manager", "Arena.gif"
			),new NPC("Dark Wizard", "DarkWizard.gif"
			),new NPC("Dark Priest", "DarkPriest.gif"
			),new NPC("Small Blackstone Scorpion", "Blackstone1.gif"
			),new NPC("Blackstone Scorpion", "Blackstone1.gif"
			),new NPC("Blackstone Wolf", "Blackstone1.gif"
			),new NPC("Blackstone Bat", "BlackstoneBat.gif"
			),new NPC("Bloodsucking Bat", "BloodsuckingBat.gif"
			),new NPC("Butcher Ghoul", "ButcherGhoul.gif"
			),new NPC("Bulldog Skeleton Warrior", "BulldogSkeletons.gif"
			),new NPC("Bulldog Skeleton Archer", "BulldogSkeletons.gif"
			),new NPC("Corpse Scorpion", "CorpseScorpion.gif"
			),new NPC("Deformed Skeleton", "DeformedSkeletons.gif"
			),new NPC("Deformed Skeleton Archer", "DeformedSkeletons.gif"
			),new NPC("Deformed Skeleton Warrior", "DeformedSkeletons.gif"
			),new NPC("Deformed skull warrior", "DeformedSkullWarrior.gif"
			),new NPC("Dusty Slime", "DustySlime.gif"
			),new NPC("Skeleton Lord", "DeformedSkeletons.gif"
			),new NPC("Deformed Zombie", "DeformedZombie.gif"
			),new NPC("Devil's Den Forest Spider", "WindForestSpider.gif"
			),new NPC("Fog Wolf", "FogWolf.gif"
			),new NPC("Giant Corpse Scorpion", "GiantCorpseScorpion.gif"
			),new NPC("Giant Oblivious Spider", "GiantObliviousSpider.gif"
			),new NPC("Green Slime", "GreenSlime.gif"
			),new NPC("Ghoul", "Graveyard2.gif"
			),new NPC("Hill Goblin", "HillGoblin.gif"
			),new NPC("Hill Goblin Magician", "HillGoblin.gif"
			),new NPC("Hill Goblin Patrol", "HillGoblin.gif"
			),new NPC("Hill Goblin Warrior", "HillGoblin.gif"
			),new NPC("Hill Goblin Commander", "HillGoblinCK.gif"
			),new NPC("Hill Goblin Shaman King", "HillGoblinCK.gif"
			),new NPC("Injured Ghoul", "Graveyard2.gif"
			),new NPC("Killer Crocodile", "KillerCrocodile.gif"
			),new NPC("Clumsey Grave Robber", "Graveyard2.gif"
			),new NPC("Lich", "Lich.gif"
			),new NPC("Lich Guardian", "Lich.gif"
			),new NPC("Lycanthrope Warrior", "LycanthropeWarrior.gif"
			),new NPC("Grave Robber", "Graveyard1.gif"
			),new NPC("Mutated Bloodsucking Bat", "MutatedBloodsuckingBat.gif"
			),new NPC("Oblivious Spider", "ObliviousSpider.gif"
			),new NPC("Shadow Orc Patrol", "ShadowOrcPatrol.gif"
			),new NPC("Shadow Orc Magician", "ShadowOrc1.gif"
			),new NPC("Shadow Orc Warrior", "ShadowOrc1.gif"
			),new NPC("Shadow Orc Warrior Commander", "ShadowOrc1.gif"
			),new NPC("Shadow Orc Shaman", "ShadowOrc1.gif"
			),new NPC("Vicious Skeleton Warrior", "ViciousSkeletonWarrior.gif"
			),new NPC("NPC Alberd Peri", "NPC_GipsyCamp.gif"
			),new NPC("NPC David Shilmal", "NPC_DavidShilmal.gif"
			),new NPC("NPC Ded Hiter", "NPC_DedHiter.gif"
			),new NPC("NPC Dibello Digrease", "NPC_GipsyCamp.gif"
			),new NPC("NPC Donald Wulburg", "NPC_DonaldWulburg.gif"
			),new NPC("NPC Emilia", "NPC_Emilia.gif"
			),new NPC("NPC James Madio", "NPC_JamesMadio.gif"
			),new NPC("NPC Leon Parker", "NPC_LeonParker.gif"
			),new NPC("NPC Neil McDonald", "NPC_NeilMcDonald.gif"
			),new NPC("NPC Peter Vincent", "NPC_GipsyCamp.gif"
			),new NPC("NPC Rod Jenold", "NPC_RodJenold.gif"
			),new NPC("NPC Scott Greems", "NPC_GipsyCamp.gif"
			),new NPC("Vicious Grave Robber", "ViciousGraveRobber.gif"
			),new NPC("Walking Corpse", "Graveyard1.gif"
			),new NPC("Wizard Harold", "Graveyard1.gif"
			),new NPC("Small Blackstone Bat", "SmallBlackstoneBat.gif"
			),new NPC("Small Bloodsucking Bat", "SmallBloodsuckingBat.gif"
			),new NPC("Small Zombie Dog", "SmallZombieDog.gif"
			),new NPC("Skeleton", "SmallZombieDog.gif"
			),new NPC("Skeleton Warrior", "Skeleton.gif"
			),new NPC("Small Grey Maned Wolf", "GreyManedWolf.gif"
			),new NPC("Giant Grey Maned Wolf", "GreyManedWolf.gif"
			),new NPC("Sunrise Shaikin", "SunriseShaikin.gif"
			),new NPC("Sunrise Black Crocodile", "KillerCrocodile.gif"
			),new NPC("Sunrise Crocodile", "SunriseCrocodile.gif"
			),new NPC("Vicious Sunrise Shaikin", "SunriseShaikin.gif"
			),new NPC("Windy Forest Hairy Spider", "WindForestSpider.gif"
			),new NPC("Windy Valley Black Bear", "WindValleyBear.gif"
			),new NPC("Windy Valley Brown Bear", "WindValleyBear.gif"
			),new NPC("Zombie Tyrant", "ZombieTyrant.gif"
			),new NPC("Zombie Dog", "Graveyard1.gif"
			),new NPC("Vagabond Lycanthrope", "VagabondLycanthrope.gif"
			)
		)
	),new Map("Dusty", 512, 425,
		new Array(
			new NPC("Slime", "DustySlime.gif"
			),new NPC("Dusty Orc Archer", "DustyOrcArcher.gif"
			),new NPC("Devil's Den Blacksmith", "DevilsDenBlacksmith.gif"
			),new NPC("Dusty Orc Warrior", "DustyOrcWarrior.gif"
			),new NPC("Dusty Orc Warrior Commander", "DustyOrcWarriorCommander.gif"
			),new NPC("Dusty Orc Lord", "DevilsDenBlacksmith.gif"
			),new NPC("Dusty Orc Messenger", "DustyOrcMessenger.gif"
			),new NPC("Dusty Orc Rogue", "DustyOrcRogue.gif"
			),new NPC("Dusty Orc Thief", "DustyOakThief.gif"
			),new NPC("Black Gorge Wolf", "BlackGorgeWolf.gif"
			),new NPC("Lycanthrope Hunter", "LycanslopeHunter.gif"
			),new NPC("Lycanthrope Predator", "LycanslopePredator.gif"
			),new NPC("Lycanthrope", "Lycanthrope.gif"
			),new NPC("Lycanthrope Leader", "LycanthropeLeader.gif"
			),new NPC("Lycanthrope Thief", "LycanslopeThief.gif"
			),new NPC("Vicious Lycanthrope", "ViciousLycanslope.gif"
			),new NPC("Vagabond Lycanthrope Warrior", "VagabondLycanslopeWarrior.gif"
			),new NPC("Vagabond Werewolf", "VagabondWerewolf.gif"
			),new NPC("Werewolf Hunter", "WerewolfHunter.gif"
			),new NPC("Small Rock Bat", "SmallRockBat.gif"
			),new NPC("Small Shadow Bat", "SmallShadowBat.gif"
			),new NPC("Shadow Bat", "ShadowBat.gif"
			),new NPC("Rock Bat", "RockBat.gif"
			),new NPC("Vicious Dusty", "ViciousDusty.gif"
			),new NPC("Giant Dusty Slime", "GiantDustySlime.gif"
			),new NPC("Dusty Hobgoblin", "DustyHobgoblin.gif"
			),new NPC("Dusty Hobgoblin Warrior", "DustyHobgoblinWarrior.gif"
			),new NPC("Dusty Hobgoblin Commander", "DustyHobgoblinWarrior.gif"
			),new NPC("Dusty Hobgoblin Captain", "DustyHobgoblinCaptain.gif"
			),new NPC("Dusty Hobgoblin Patriarch", "DustyHobgoblinCaptain.gif"
			),new NPC("Vagabond Lycanthrope Warrior", "VagabondLycanthropeWarrior.gif"
			),new NPC("Grey Dusty Wolf", "GreyDustyWolf.gif"
			),new NPC("Black Dusty Wolf", "BlackDustyWolf.gif"
			)
		)
	),new Map("Palmas", 520, 427,
		new Array(
			new NPC("Plain Lion", "PlainLion.gif"
			),new NPC("Plain Lioness", "PlainLion.gif"
			),new NPC("Small Plain Lion", "PlainLion.gif"
			),new NPC("Albino Plain Lion", "AlbinoPlainLion.gif"
			),new NPC("Albino Plain Lioness", "AlbinoPlainLion.gif"
			),new NPC("Silver Werewolf", "SilverWerewolf.gif"
			),new NPC("Lake Slime", "LakeSlime.gif"
			),new NPC("Valley Scorpion", "ValleyScorpion.gif"
			),new NPC("Valley Scorpion", "SmallValleyScorpion.gif"
			),new NPC("Wolf Spider", "WolfSpider.gif"
			),new NPC("Red Scorpion", "RedScorpion.gif"
			),new NPC("Lake Killer Crocodile", "LakeKillerCrocodile.gif"
			),new NPC("Palmas Thief", "Palmasthief.gif"
			),new NPC("Palmas Savage", "Palmasthief.gif"
			),new NPC("Palmas Defector Bowman", "PalmasDefectorBowman.gif"
			)
		)
	),new Map("GYPSY", 520, 427,
		new Array(
			new NPC("barried sand golem", "barried_sand_golem.jpg"
			),new NPC("bronze gorgon", "bronze_gorgon.jpg"
			),new NPC("copper gorgon", "copper_gorgon.jpg"
			),new NPC("deformed ogre ", "deformed_ogre.jpg"
			),new NPC("deformed wild troll 53", "deformed_wild_troll_53.jpg"
			),new NPC("dread manticore", "dread_manticore.jpg"
			),new NPC("dwarf orc archer", "dwarf_orc_archer.jpg"
			),new NPC("dwarf orc lord", "dwarf_orc_lord.jpg"
			),new NPC("dwarf orc magican", "dwarf_orc_magican.jpg"
			),new NPC("dwarf orc shamen", "dwarf_orc_shamen.jpg"
			),new NPC("dwarf orc warrior", "dwarfwarrior.gif"
			),new NPC("dwarf orc", "dwarf_orc.jpg"
			),new NPC("giant tarantula", "giant_tarantula.jpg"
			),new NPC("gypsy hobgoblin patriah", "gypsy_hobgoblin_patriah.jpg"
			),new NPC("gypsy hobgoblin warlord fiughter captain commander", "gypsy_hobgoblin_warlord_fiughter_captain_commander.jpg"		
			),new NPC("gypsy hobgoblin warrior.jpg", "gypsy_hobgoblin_warrior.jpg"
			),new NPC("gypsy hobgoblin.jpg", "gypsy_hobgoblin.jpg"
			),new NPC("iron gorgon.jpg", "iron_gorgon.jpg"
			),new NPC("manticore.jpg", "manticore.jpg"
			),new NPC("ogre berseker.jpg", "ogre_berseker.jpg"
			),new NPC("ogre destroyer.jpg", "ogre_destroyer.jpg"
			),new NPC("ogre warrior.jpg", "ogre_warrior.jpg"
			),new NPC("ogre.jpg", "ogre.jpg"
			),new NPC("poison manticore.jpg", "poison_manticore.jpg"
			),new NPC("Strong sand Goem.jpg", "strong_sand_goem.jpg"
			),new NPC("strong_sand_golem.jpg", "strong_sand_golem.jpg"
			),new NPC("tarantula 53.jpg", "tarantula_53.jpg"
			),new NPC("troll again.jpg", "troll_again.jpg"
			),new NPC("troll invader.jpg", "troll_invader.jpg"
			),new NPC("troll warrior.jpg", "troll_warrior.jpg"
			),new NPC("troll.jpg", "troll.jpg"
			)
		)	
	),new Map("v1", 420, 461,
		new Array(
			new NPC("Alligator 12", "Alligator12.gif"
			),new NPC("Amazon Manticore 49", "AmazonManticore49.gif"
			),new NPC("Amemit 24", "Amemit24.gif"
			),new NPC("Wildness Ratmen Lv29", "WildnessRatmenLv29.gif"
			),new NPC("Ancient Blue Draconic 54", "AncientBlueDraconic54.gif"
			),new NPC("Ancient Zombie 18", "AncientZombie18.gif"
			),new NPC("Barrier Sand Golem 56", "BarrierSandGolem56.gif"
			),new NPC("Big Goblin 3", "BigGoblin3.gif"
			),new NPC("Big Orc 6", "BigOrc6.gif"
			),new NPC("Bind stone", "BindStone.gif"
			),new NPC("Black Bear 8", "BlackBear8.gif"
			),new NPC("Blazing Skeleton 19", "BlazingSkeleton19.gif"
			),new NPC("Blood Sucking Troll 39", "BloodSuckingTroll39.gif"
			),new NPC("Blue Draconic 52", "BlueDraconic52.gif"
			),new NPC("Blue Draconic 71", "BlueDraconic71.gif"
			),new NPC("Bronze Gorgon 44", "BronzeGorgon44.gif"
			),new NPC("Bronze Gorgon 62", "BronzeGorgon62.gif"
			),new NPC("Brown Bear 10", "BrownBear10.gif"
			),new NPC("Calcus Hound 19", "CalcusHound19.gif"
			),new NPC("Captivated Zombie 20", "CalcusHound19.gif"
			),new NPC("Cave Troll 40", "CaveTroll40.gif"
			),new NPC("Clay Golem 39", "ClayGolem39.gif"
			),new NPC("Cobweb Freak 6", "CobwebFreak6.gif"
			),new NPC("Copper Gorgon 41", "CopperGorgon41.gif"
			),new NPC("Copper Gorgon 61", "CopperGorgon61.gif"
			),new NPC("Crab Spider 4", "CrabSpider4.gif"
			),new NPC("Crocodile 9", "Crocodile9.gif"
			),new NPC("Crystal Golem 45", "CrystalGolem45.gif"
			),new NPC("Dark Gelatin 35", "DarkGelatin35.gif"
			),new NPC("Dark Sand Golem 63", "DarkSandGolem63.gif"
			),new NPC("Dark Wolf 3", "DarkWolf3.gif"
			),new NPC("Dark Wolf 4", "DarkWolf4.gif"
			),new NPC("Decayed Zombie 17", "DecayedZombie17.gif"
			),new NPC("Demon Manticore 62", "DemonManticore62.gif"
			),new NPC("Dire Wolf 8", "DireWolf8.gif"
			),new NPC("Down Waker 8", "DownWaker8.gif"
			),new NPC("Dread Manticore 43", "DreadManticore43.gif"
			),new NPC("Dread Manticore 60", "DreadManticore60.gif"
			),new NPC("Dusk Waker 10", "DuskWaker10.gif"
			),new NPC("Dwarf Orc 53", "DwarfOrc53.gif"
			),new NPC("Dwarf Orc Archer 58", "DwarfOrc53.gif"
			),new NPC("Dwarf Orc Lord 60", "DwarfOrc53.gif"
			),new NPC("Dwarf Orc Shaman 60", "DwarfOrc53.gif"
			),new NPC("Dwarf Orc Warrior 55", "DwarfOrc53.gif"
			),new NPC("Echidna Belle 37", "EchidnaBelle37.gif"
			),new NPC("Echidna Predator 38", "EchidnaPredator38.gif"
			),new NPC("Echidna Seducer 34/35", "EchidnaSeducer.gif"
			),new NPC("Elder Orc Magician 14", "ElderOrcMagician14.gif"
			),new NPC("Elder Orc Shaman 15", "ElderOrcMagician14.gif"
			),new NPC("Evil Skeleton 13", "EvilSkeleton13.gif"
			),new NPC("Freezing Golem 42", "FreezingGolem42.gif"
			),new NPC("Frosty Lion 15/16", "FrostyLion.gif"
			),new NPC("Frosty Skeleton 23", "FrostySkeleton23.gif"
			),new NPC("Gargoyle Guardian 41", "GargoyleGuardian41.gif"
			),new NPC("Gargoyle Keeper 40", "GargoyleGuardian41.gif"
			),new NPC("Ghoul 22", "Ghoul22.gif"
			),new NPC("Gigantic Red Scorpion 26", "GiganticScorpion.gif"
			),new NPC("Gigantic Scorpion 25", "GiganticScorpion.gif"
			),new NPC("Gigantic Scorpion King 29", "GiganticScorpion.gif"
			),new NPC("Glacial Skeleton 32", "GlacialSkeleton32.gif"
			),new NPC("Goblin 2", "Goblin1.gif"
			),new NPC("Goblin Chief 10", "Goblin2.gif"
			),new NPC("Goblin Leader 8", "Goblin2.gif"
			),new NPC("Goblin Scout 5", "Goblin1.gif"
			),new NPC("Goblin Searcher 4", "Goblin1.gif"
			),new NPC("Goblin Shaman King 12", "Goblin2.gif"
			),new NPC("Goblin Warrior 6", "Goblin1.gif"
			),new NPC("Goblin Warrior Leader 7", "Goblin1.gif"
			),new NPC("Gravel Golem 47", "GravelGolem47.gif"
			),new NPC("Grey Wolf 2", "GreyWolf2.gif"
			),new NPC("Grizzly 13", "Grizzly.gif"
			),new NPC("Hatti Amazon Manticore 50", "BlueDraconic52.gif"
			),new NPC("Hatti Bronze Gorgon 45", "HattiBronzeGorgon45.gif"
			),new NPC("Hatti Copper Gorgon 42", "HattiCopperGorgon42.gif"
			),new NPC("Hatti Dread Manticore 44", "HattiBronzeGorgon45.gif"
			),new NPC("Hatti Iron Gorgon 48", "HattiIronGorgon48.gif"
			),new NPC("Hatti Manticore 42", "HattiCopperGorgon42.gif"
			),new NPC("Hatti Poison Manticore 48", "HattiPoisonManticore48.gif"
			),new NPC("Hatti Silver Gorgon 50", "BlueDraconic52.gif"
			),new NPC("Hunger Bear 9", "HungerBear9.gif"
			),new NPC("Hunger Black Bear 11", "HungerBear9.gif"
			),new NPC("Hunger Crocodile 10", "GiganticScorpion.gif"
			),new NPC("Hunger Wolf 3", "GreyWolf2.gif"
			),new NPC("Ice Golem 41", "FreezingGolem42.gif"
			),new NPC("Iron Gorgon 47", "IronGorgon47.gif"
			),new NPC("Iron Gorgon 65", "IronGorgon65.gif"
			),new NPC("Kindle Skeleton 34", "GlacialSkeleton32.gif"
			),new NPC("Kujo 10", "Kujo10.gif"
			),new NPC("Latern Skeleton 17", "LaternSkeleton17.gif"
			),new NPC("Lava Skeleton 25", "LavaSkeleton25.gif"
			),new NPC("Lion 9", "Grizzly.gif"
			),new NPC("Lizardman 33", "Lizardman.gif"
			),new NPC("Lizardman Tarter 36", "LizardmanTarter.gif"
			),new NPC("Lizardman Troglodyte 35", "Lizardman.gif"
			),new NPC("Lizardman Trooper 37", "Lizardman.gif"
			),new NPC("Lizardman Valiant Trooper 38", "Lizardman.gif"
			),new NPC("Lycanthrope Assassin", "Lycanthrope.gif"
			),new NPC("Lycanthrope Chaser", "Lycanthrope.gif"
			),new NPC("Lycanthrope Gladiator", "Lycanthrope.gif"
			),new NPC("Lycanthrope Human Hunter", "Lycanthrope.gif"
			),new NPC("Lycanthrope Searcher", "Lycanthrope.gif"
			),new NPC("Malice Skeleton 35", "GlacialSkeleton32.gif"
			),new NPC("Manticore 41", "CopperGorgon41.gif"
			),new NPC("Manticore 62", "IronGorgon65.gif"
			),new NPC("Marsh Hobgoblin 21", "MarshHobgoblin.gif"
			),new NPC("Marsh Hobgoblin Captain 23", "MarshHobgoblin.gif"
			),new NPC("Marsh Hobgoblin Fighter 22", "MarshHobgoblin.gif"
			),new NPC("Marsh Hobgoblin Leader 24", "MarshHobgoblin.gif"
			),new NPC("Marsh Hobgoblin Warlord 27", "MarshHobgoblin.gif"
			),new NPC("Mire Golem 40", "MireGolem40.gif"
			),new NPC("Mire Golem 62", "DarkSandGolem63.gif"
			),new NPC("Mobile Shop", "MobileShop.gif"
			),new NPC("Ogre 43", "Ogres43.gif"
			),new NPC("Ogre Berserker 51", "HattiPoisonManticore48.gif"
			),new NPC("Ogre Destroyer 49", "Ogres.gif"
			),new NPC("Ogre Executioner 47", "Ogres.gif"
			),new NPC("Ogre Juggernaut 50", "HattiPoisonManticore48.gif"
			),new NPC("Orc 5", "Orcs.gif"
			),new NPC("Orc Archer 9", "Orcs.gif"
			),new NPC("Orc Lord 13", "Orcs.gif"
			),new NPC("Orc Magician 7", "Orcs.gif"
			),new NPC("Orc Shaman 8", "Orcs.gif"
			),new NPC("Orc Warrior 10", "Orcs.gif"
			),new NPC("Orc Warrior Leader 11", "Orcs.gif"
			),new NPC("Pigmy Evil Skeleton 3", "PigmyEvilSkeleton3.gif"
			),new NPC("Pigmy Skeleton 1", "PigmySkeleton1.gif"
			),new NPC("Pigmy Skeleton Archer 2", "PigmySkeletonArcher2.gif"
			),new NPC("Pigmy Skeleton Soldier 5", "PigmySkeletonSoldier5.gif"
			),new NPC("Pigmy Skeleton Commander 6", "PigmySkeletonCommander6.gif"
			),new NPC("Pigmy Vice Skeleton 4", "PigmyViceSkeleton4.gif"
			),new NPC("Poison Manticore 46", "IronGorgon47.gif"
			),new NPC("Poison Manticore 65", "IronGorgon65.gif"
			),new NPC("Portal to Palmas City", "PortaltoPalmasCity.gif"
			),new NPC("Portal to Rog (West)", "PortaltoRogWest.gif"
			),new NPC("Portal to Rog (South)", "PortaltoRogSouth.gif"
			),new NPC("Portal to Saltic Town", "PortaltoSalticTown.gif"
			),new NPC("Portal to Shadowmine", "PortaltoShadowmine.gif"
			),new NPC("Red Scorpion 11", "RedScorpion11.gif"
			),new NPC("Rock Cults Golem 44", "FreezingGolem42.gif"
			),new NPC("Rock Golem 63", "RockGolem63.gif"
			),new NPC("Scorpion 5", "RedScorpion11.gif"
			),new NPC("Scorpion 7", "Scorpion7.gif"
			),new NPC("Silver Gorgon 49", "AmazonManticore49.gif"
			),new NPC("Silver Wolf 7", "SilverWolf7.gif"
			),new NPC("Skeleton 12", "EvilSkeleton13.gif"
			),new NPC("Skeleton Archer 14", "EvilSkeleton13.gif"
			),new NPC("Skeleton Commander 20", "SkeletonCommander20.gif"
			),new NPC("Skeleton Monarch 50", "SkeletonMonarch50.gif"
			),new NPC("Skeleton Officer 37", "GlacialSkeleton32.gif"
			),new NPC("Skeleton Soldier 15", "EvilSkeleton13.gif"
			),new NPC("Soulless Zombie 21", "Amemit24.gif"
			),new NPC("Spider 3", "Spider3.gif"
			),new NPC("Squal 30", "Squal30.gif"
			),new NPC("Stone Golem 48", "Ogres.gif"
			),new NPC("Strong Big Orc 13", "ElderOrcMagician14.gif"
			),new NPC("Strong Hobgoblin 16", "Hobgoblin1.gif"
			),new NPC("Strong Hobgoblin Captain 18", "Hobgoblin1.gif"
			),new NPC("Strong Hobgoblin Fighter 17", "Hobgoblin1.gif"
			),new NPC("Strong Hobgoblin Leader 19", "Hobgoblin1.gif"
			),new NPC("Strong Hobgoblin Warlord 21", "Hobgoblin1.gif"
			),new NPC("Strong Marsh Hobgoblin 22", "Hobgoblin1.gif"
			),new NPC("Strong Marsh Hobgoblin Captain 25", "Hobgoblin2.gif"
			),new NPC("Strong Marsh Hobgoblin Fighter 24", "Hobgoblin2.gif"
			),new NPC("Strong Marsh Hobgoblin Leader 26", "Hobgoblin2.gif"
			),new NPC("Strong Marsh Hobgoblin Warlord 28", "Hobgoblin2.gif"
			),new NPC("Strong Orc 12", "ElderOrcMagician14.gif"
			),new NPC("Strong Orc Archer 16", "ElderOrcMagician14.gif"
			),new NPC("Strong Orc Lord 20", "ElderOrcMagician14.gif"
			),new NPC("Strong Orc Warrior 17", "ElderOrcMagician14.gif"
			),new NPC("Strong Orc Warrior Leader 18", "ElderOrcMagician14.gif"
			),new NPC("Strong Sand Golem 59", "DarkSandGolem63.gif"
			),new NPC("Titan 57", "HattiIronGorgon48.gif"
			),new NPC("Troll 38", "CaveTroll40.gif"
			),new NPC("Troll Invader 58", "TrollInvader58.gif"
			),new NPC("Troll Warrior 41", "CaveTroll40.gif"
			),new NPC("Vagabond Sand Golem 53", "DarkSandGolem63.gif"
			),new NPC("Vagabond Troll 53", "TrollInvader58.gif"
			),new NPC("Venom Skeleton 27", "VenomSkeleton27.gif"
			),new NPC("Vice Skeleton 14", "EvilSkeleton13.gif"
			),new NPC("Vicious Tarantula 55", "ViciousTarantula55.gif"
			),new NPC("Werewolf 26", "Werewolf26.gif"
			),new NPC("Wildness Ratman 29", "RatMan.gif"
			),new NPC("Wildness Ratman Assassin 32", "RatMan.gif"
			),new NPC("Wildness Ratman Hunter 31", "RatMan.gif"
			),new NPC("Wildness Ratman Scavenger 30", "RatMan.gif"
			),new NPC("Wolf Spider 5", "Spider3.gif"
			),new NPC("Young Black Bear 5", "BlackBear8.gif"
			),new NPC("Young Blue Draconic 62", "IronGorgon65.gif"
			),new NPC("Young Brown Bear 6", "BlackBear8.gif"
			),new NPC("Young Grey Wolf 1", "YoungGreyWolf1.gif"
			)
		)
	)
);
FindSearch();
CapitalizeNSortNPCs();
InitMapOptions();
